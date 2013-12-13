var express = require('express');

var Router = require('./router');

var app = express();

app.get('/*', function(req, res) {
    var router = new Router();
    response = router.map(req.params[0]);
    if (response) {
        res.json(response);
    } else {
        res.status(404).send('Not found');
    };
});

app.listen(process.env.PORT || 8080);
