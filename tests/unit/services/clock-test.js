import Ember from 'ember';

import { moduleFor, test } from 'ember-qunit';

moduleFor('service:clock', 'Unit | Service | clock');

test('assert that clock will tick two seconds accurately', function(assert) {
  assert.expect(1);
  var clock = this.subject();
  var done = assert.async();
  Ember.run.later(function() {
    assert.equal(clock.get('second'), 2, 'The clock has ticked twice at 1 second intervals');
    done();
  }, 2100);
});

test('assert that the interval timing can be changed', function(assert) {
  assert.expect(1);
  var clock = this.subject();
  clock.set('intervalTime', 100);
  var done = assert.async();
  Ember.run.later(function() {
    assert.equal(clock.get('second'), 2, 'The clock has ticked twice at 100ms intervals');
    done();
  }, 250);
});

test('assert that all counts are incrementing accurately', function(assert) {
  assert.expect(5);
  var clock = this.subject();
  for (var i=0; i < 7200; i++) {
    clock.tick();
  }
  var vals = clock.getProperties('second', 'minute', 'five', 'quarter', 'hour');
  assert.ok(vals.second === 7200, 'Seconds are accurate');
  assert.ok(vals.minute === 120, 'Minutes are accurate');
  assert.ok(vals.five === 24, 'Five minute increments are accurate');
  assert.ok(vals.quarter === 8, 'Quarter hour increments are accurate');
  assert.ok(vals.hour === 2, 'Hours are accurate');
});
