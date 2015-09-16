import Ember from 'ember';

export default Ember.Controller.extend({
  clock: Ember.inject.service(),
  actions: {
    reset: function() {
      this.clock.reset();
    }
  }
});
