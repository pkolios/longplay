var _ = require('lodash');

var pages = [
    { 'id': 1, 'route_id': 1, 'title': 'test', 'content': 'hello work' },
    { 'id': 2, 'route_id': 2, 'title': 'foo', 'content': 'baer' }
];

var Pager = function() {};

Pager.prototype.list = function() {
    // TODO switch to storage agnostic
    // TODO move memory storage implementation out
    return pages;
};

Pager.prototype.map = function(route_id) {
    var match = _.find(pages, { 'route_id': route_id });
    return match;
};

Pager.prototype.add = function(route_id, title, content) {
    // TODO switch to storage agnostic
    // TODO move memory storage implementation out
    // TODO data validation
    var id = _.last(pages).id + 1;
    var newPage = {
        'id': id,
        'route_id': route_id,
        'title': title,
        'content': content
    };
    pages.push(newPage);
    return newPage;
};
module.exports = Pager;
