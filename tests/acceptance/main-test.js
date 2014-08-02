import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Main', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('testing that the clock service starts', function() {
  visit('/');

  Ember.run.later(function() {
    equal(find('li:first').text(), '1 seconds', 'Verify that the clock ticks once');
  }, 1100);
});
