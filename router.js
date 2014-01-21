var _ = require('lodash');
var uuid = require('node-uuid');

var routes = [{
    'id': '831d7194-cb46-4721-bb12-3f6583d0752f',
    'priority': '1',
    'url': 'foo/bar'
}];

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
};

Router.prototype.add = function(url, priority) {
    // TODO switch to storage agnostic
    // TODO move memory storage implementation out
    // TODO data validation
    var newRoute = {
        'id': uuid.v4(),
        'priority': priority,
        'url': url
    };
    routes.push(newRoute);
    return newRoute;
};

Router.prototype.delete = function(id) {
    var match = _.find(routes, { 'id': id });
    routes = _.without(routes, match);
};
module.exports = Router;
