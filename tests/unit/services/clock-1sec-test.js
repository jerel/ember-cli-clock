import lolex from 'lolex';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

// 2016-02-03T11:50:53Z
const START_TIME = 1454500253000;

module('Unit | Service | clock-1sec', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.fakeClock = lolex.install();
    this.fakeClock.tick(START_TIME);
  });

  hooks.afterEach(function() {
    this.fakeClock.uninstall();
  });

  test('assert that clock will tick two seconds accurately', function(assert) {
    const clock = this.owner.lookup('service:clock');
    assert.equal(clock.get('time'), START_TIME, 'The clock has not ticked yet');

    this.fakeClock.tick(999);
    assert.equal(clock.get('time'), START_TIME, 'The clock has not ticked yet');

    this.fakeClock.tick(1);
    assert.equal(clock.get('time'), START_TIME + 1000, 'The clock has ticked once');

    this.fakeClock.tick(1100);
    assert.equal(clock.get('time'), START_TIME + 2000, 'The clock has ticked twice at 1 second intervals');
  });

  test('assert that the interval timing can be changed', function(assert) {
    const clock = this.owner.lookup('service:clock');
    assert.equal(clock.get('time'), START_TIME, 'The clock has not ticked yet');

    clock.set('interval', 100);
    assert.equal(clock.get('time'), START_TIME, 'The clock has not ticked yet');

    this.fakeClock.tick(99);
    assert.equal(clock.get('time'), START_TIME, 'The clock has not ticked yet');

    this.fakeClock.tick(1);
    assert.equal(clock.get('time'), START_TIME + 100, 'The clock has ticked once');

    this.fakeClock.tick(110);
    assert.equal(clock.get('time'), START_TIME + 200, 'The clock has ticked twice at 100ms intervals');
  });

});

