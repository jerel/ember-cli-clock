import Ember from 'ember';

import {
  test,
  moduleFor
} from 'ember-qunit';

moduleFor('service:clock', 'Unit - Clock');

test('assert that clock will tick two seconds accurately', function() {
  expect(1);
  var clock = this.subject();
  QUnit.stop();
  Ember.run.later(function() {
    equal(clock.get('second'), 2, 'The clock has ticked twice at 1 second intervals');
    QUnit.start();
  }, 2100);
});

test('assert that the interval timing can be changed', function() {
  expect(1);
  var clock = this.subject();
  clock.set('intervalTime', 100);
  QUnit.stop();
  Ember.run.later(function() {
    equal(clock.get('second'), 2, 'The clock has ticked twice at 100ms intervals');
    QUnit.start();
  }, 250);
});

test('assert that all counts are incrementing accurately', function() {
  expect(5);
  var clock = this.subject();
  for (var i=0; i < 7200; i++) {
    clock.tick();
  }
  var vals = clock.getProperties('second', 'minute', 'five', 'quarter', 'hour');
  ok(vals.second === 7200, 'Seconds are accurate');
  ok(vals.minute === 120, 'Minutes are accurate');
  ok(vals.five === 24, 'Five minute increments are accurate');
  ok(vals.quarter === 8, 'Quarter hour increments are accurate');
  ok(vals.hour === 2, 'Hours are accurate');
});
