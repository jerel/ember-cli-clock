import Ember from 'ember';

export default Ember.Component.extend({
  clock: Ember.inject.service(),
  actions: {
    reset() {
      this.get('clock').reset();
    },
  },
});
