import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { later } from '@ember/runloop'

module('Acceptance | main', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');

    later(() => {
      assert.equal(this.element.querySelector('ul li').textContent, '1 seconds', 'Verify that the clock ticks once');
    }, 1100);
  });
});
