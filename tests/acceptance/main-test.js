import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | main');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    Ember.run.later(function() {
      assert.equal(find('li:first').text(), '1 seconds', 'Verify that the clock ticks once');
    }, 1100);
  });
});
