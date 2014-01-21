var _ = require('lodash');
var uuid = require('node-uuid');

var templates = [{
    'id': 'a486d3c3-bae9-49dc-afe3-e88c0b9b7425',
    'name': 'example',
    'template': '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>{{ title }}</title></head><body>{{ content }}</body></html>'
}];

var Templater = function() {};

Templater.prototype.list = function() {
    // TODO switch to storage agnostic
    // TODO move memory storage implementation out
    return templates;
};

Templater.prototype.add = function(name, template) {
    // TODO switch to storage agnostic
    // TODO move memory storage implementation out
    // TODO data validation
    var newTemplate = {
        'id': uuid.v4(),
        'name': name,
        'template': template
    };
    templates.push(newTemplate);
    return newTemplate;
};

Templater.prototype.delete = function(id) {
    var match = _.find(templates, { 'id': id });
    templates = _.without(templates, match);
};

module.exports = Templater;
