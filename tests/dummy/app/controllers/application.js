import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    reset: function() {
      this.clock.reset();
    }
  }
});
