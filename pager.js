var _ = require('lodash');
var uuid = require('node-uuid');

var pages = [];

var Pager = function() {};

Pager.prototype.get = function(id) {
    var match = _.find(pages, { 'id': id });
    return match;
};

Pager.prototype.list = function() {
    // TODO switch to storage agnostic
    // TODO move memory storage implementation out
    return pages;
};

Pager.prototype.map = function(route_id) {
    var match = _.find(pages, { 'route_id': route_id });
    return match;
};

Pager.prototype.add = function(route_id, template_id, title, content) {
    // TODO switch to storage agnostic
    // TODO move memory storage implementation out
    // TODO data validation
    var newPage = {
        'id': uuid.v4(),
        'route_id': route_id,
        'template_id': template_id,
        'title': title,
        'content': content
    };
    pages.push(newPage);
    return newPage;
};

Pager.prototype.edit = function(id, route_id, template_id, title, content) {
    var match = _.find(pages, { 'id': id });
    match.route_id = route_id;
    match.template_id = template_id;
    match.title = title;
    match.content = content;
    return match;
};

Pager.prototype.delete = function(id) {
    var match = _.find(pages, { 'id': id });
    pages = _.without(pages, match);
};

module.exports = Pager;
