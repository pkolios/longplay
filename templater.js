var _ = require('lodash');
var uuid = require('node-uuid');

var templates = [];

var Templater = function() {};

Templater.prototype.list = function() {
    // TODO switch to storage agnostic
    // TODO move memory storage implementation out
    return templates;
};

Templater.prototype.list = function() {
    // TODO switch to storage agnostic
    // TODO move memory storage implementation out
    return templates;
}

Templater.prototype.add = function(name) {
    // TODO switch to storage agnostic
    // TODO move memory storage implementation out
    // TODO data validation
    var newTemplate = {
        'id': uuid.v4(),
        'name': name
    };
    templates.push(newTemplate);
    return newTemplate;
};
module.exports = Templater;
