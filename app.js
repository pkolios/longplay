var _ = require('lodash');
var swig = require('swig');

var app = require('./init');

var Pager = require('./pager');
var Router = require('./router');
var Templater = require('./templater');


app.get('/admin', function(req, res) {
    // TODO Admin dashboard
    res.render('index', {});
});

app.get('/admin/routes', function(req, res) {
    var router = new Router();
    res.render('routes/index', {'routes': router.list()});
});

app.get('/admin/routes/add', function(req, res) {
    res.render('routes/add', {});
});

app.post('/admin/routes', function(req, res) {
    var router = new Router();
    router.add(req.body.route, req.body.priority);

    res.redirect('/admin/routes');
});

app.get('/admin/routes/:id/edit', function(req, res) {
    var router = new Router();
    res.render('routes/edit', {'route': router.get(req.params.id)});
});

app.post('/admin/routes/:id/edit', function(req, res) {
    var router = new Router();
    router.edit(req.params.id, req.body.route, req.body.priority);

    res.redirect('/admin/routes');
});

app.get('/admin/routes/:id/delete', function(req, res) {
    var router = new router();
    router.delete(req.params.id);
    res.redirect('/admin/routes');
});

app.get('/admin/pages', function(req, res) {
    var pager = new Pager();
    var router = new Router();
    var templater = new Templater();
    var pages = pager.list();
    var routes = router.list();
    var templates = templater.list();

    pages.forEach(function(page) {
        page.route = _.find(routes, {'id': page.route_id})
        page.template = _.find(templates, {'id': page.template_id})
    });
    res.render('pages/index', {'pages': pager.list()});
});

app.get('/admin/pages/add', function(req, res) {
    var router = new Router();
    var templater = new Templater();
    var routes = router.list();
    var templates = templater.list();
    res.render('pages/add', {'routes': routes, 'templates': templates});
});

app.post('/admin/pages', function(req, res) {
    var pager = new Pager();
    pager.add(req.body.route_id, req.body.template_id, req.body.title, req.body.content);

    res.redirect('/admin/pages');
});

app.get('/admin/pages/:id/delete', function(req, res) {
    var pager = new Pager();
    pager.delete(req.params.id);
    res.redirect('/admin/pages');
});

app.get('/admin/templates', function(req, res) {
    var templater = new Templater();
    res.render('templates/index', {'templates': templater.list()});
});

app.get('/admin/templates/add', function(req, res) {
    res.render('templates/add', {});
});

app.post('/admin/templates', function(req, res) {
    var templater = new Templater();
    templater.add(req.body.name, req.body.template);

    res.redirect('/admin/templates');
});

app.get('/admin/templates/:id/delete', function(req, res) {
    var templater = new Templater();
    templater.delete(req.params.id);
    res.redirect('/admin/templates');
});

app.get('/*', function(req, res) {
    var router = new Router();
    var route = router.map(req.params[0]);
    if (route) {
        var pager = new Pager();
        var templater = new Templater();
        var page = pager.map(route.id);

        var templates = templater.list();
        page.template = _.find(templates, {'id': page.template_id})

        var response = swig.render(page.template.template,
            {locals: {title: page.title, content: page.content }});
        res.status(200).send(response);
    } else {
        // TODO render a 404 template
        res.status(404).send('Not found');
    };
});

app.listen(process.env.PORT || 8080);
