var app = require('./init');

var Pager = require('./pager');
var Router = require('./router');
var Templater = require('./templater');


app.get('/admin', function(req, res) {
    // TODO Admin dashboard
    res.render('index', {});
});

app.get('/admin/routes', function(req, res) {
    // Routes list
    var router = new Router();
    res.json(router.list());
});

app.get('/admin/routes/add', function(req, res) {
    // Add route form
    res.render('routes/add', {});
});

app.post('/admin/routes', function(req, res) {
    var router = new Router();
    router.add(req.body.route, req.body.priority);

    res.redirect('/admin/routes');
});

app.get('/admin/templates', function(req, res) {
    // templates list
    var templater = new Templater();
    res.json(templater.list());
});

app.get('/admin/templates/add', function(req, res) {
    // Add template form
    res.render('templates/add', {});
});

app.post('/admin/templates', function(req, res) {
    var templater = new Templater();
    templater.add(req.body.template);

    res.redirect('/admin/templates');
});

app.get('/admin/pages', function(req, res) {
    // Routes list
    var pager = new Pager();
    res.json(pager.list());
});

app.get('/admin/pages/add', function(req, res) {
    // Add page form
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

app.get('/*', function(req, res) {
    var router = new Router();
    var route = router.map(req.params[0]);
    if (route) {
        var pager = new Pager();
        var response = pager.map(route.id);
        res.json(response);
    } else {
        // TODO render a 404 template
        res.status(404).send('Not found');
    };
});

app.listen(process.env.PORT || 8080);
