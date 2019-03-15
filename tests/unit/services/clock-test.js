import lolex from 'lolex';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | clock', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.fakeClock = lolex.install();
  });

  hooks.afterEach(function() {
    this.fakeClock.uninstall();
  });

  test('assert that clock will tick two seconds accurately', function(assert) {
    const clock = this.owner.lookup('service:clock');
    assert.equal(clock.get('second'), 0, 'The clock has not ticked yet');

    this.fakeClock.tick(2100);
    assert.equal(clock.get('second'), 2, 'The clock has ticked twice at 1 second intervals');
  });

  test('assert that the interval timing can be changed', function(assert) {
    const clock = this.owner.lookup('service:clock');
    assert.equal(clock.get('second'), 0, 'The clock has not ticked yet');

    clock.set('intervalTime', 100);
    assert.equal(clock.get('second'), 0, 'The clock has not ticked yet');

    this.fakeClock.tick(250);
    assert.equal(clock.get('second'), 2, 'The clock has ticked twice at 100ms intervals');
  });

  test('assert that all counts are incrementing accurately', function(assert) {
    const clock = this.owner.lookup('service:clock');

    this.fakeClock.tick(7200000);

    let vals = clock.getProperties('second', 'minute', 'five', 'quarter', 'hour');
    assert.ok(vals.second === 7200, 'Seconds are accurate');
    assert.ok(vals.minute === 120, 'Minutes are accurate');
    assert.ok(vals.five === 24, 'Five minute increments are accurate');
    assert.ok(vals.quarter === 8, 'Quarter hour increments are accurate');
    assert.ok(vals.hour === 2, 'Hours are accurate');
  });
});
