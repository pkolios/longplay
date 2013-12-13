var _ = require('lodash');

var routes = [
    { 'id': 1, 'url': 'test' },
    { 'id': 2, 'url': 'foo' }
];

var Router = function() {};

Router.prototype.map = function(url) {
    // TODO Deal with trailing slashes
    // TODO Support extracting params from the url
    // TODO Support some form of regex pattern matching
    var match = _.find(routes, { 'url': url });
    return match;
};

module.exports = Router;
