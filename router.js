var _ = require('lodash');

var routes = [
    { 'id': 1, 'priority': 0, 'url': 'test' },
    { 'id': 2, 'priority': 0, 'url': 'foo' }
];

var Router = function() {};

Router.prototype.map = function(url) {
    // TODO Deal with multiple matches / priorities
    // TODO Deal with trailing slashes
    // TODO Support extracting params from the url
    // TODO Support some form of regex pattern matching
    var match = _.find(routes, { 'url': url });
    return match;
};

Router.prototype.list = function() {
    // TODO switch to storage agnostic
    // TODO move memory storage implementation out
    return routes;
}

Router.prototype.add = function(url, priority) {
    // TODO switch to storage agnostic
    // TODO move memory storage implementation out
    // TODO data validation
    var id = _.last(routes).id + 1;
    var newRoute = {
        'id': id,
        'priority': priority,
        'url': url
    };
    routes.push(newRoute);
    return newRoute;
}
module.exports = Router;
