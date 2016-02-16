import Ember from 'ember';
import Clock from 'ember-cli-clock/services/legacy';

export default Clock.extend({
  init() {
    this._super(...arguments);
    Ember.deprecate(
      'Usage of the `clock` service is deprecated. ' +
      'Please generate your own clock service with `ember generate clock <name>`.',
      false,
      {
        id: 'ember-cli-clock.deprecate-legacy-clock-service',
        until: '3.0.0'
      }
    );
  }
});
