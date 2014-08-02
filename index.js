'use strict';

var path = require('path');
var fs   = require('fs');

function EmberCLIClock(project) {
  this.project = project;
  this.name    = 'Ember CLI Clock';
}

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

EmberCLIClock.prototype.treeFor = function treeFor(name) {
  var treePath = path.relative(process.cwd(), __dirname);

  if (name === 'styles' || name === 'templates') {
      treePath = path.join(treePath, 'app', name);
  } else {
      treePath = path.join(treePath, name);
  }

  if (fs.existsSync(treePath)) {
    if (process.env.EMBER_ADDON_ENV === 'development') {
      return treePath;
    } else {
      return unwatchedTree(treePath);
    }
  }
};

EmberCLIClock.prototype.included = function included(app) {
  this.app = app;
};

module.exports = EmberCLIClock;
