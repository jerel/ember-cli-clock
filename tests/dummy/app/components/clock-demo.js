import Ember from 'ember';

export default Ember.Component.extend({
  clock: Ember.inject.service(),
  'clock-1sec': Ember.inject.service(),
  'clock-5sec': Ember.inject.service(),
  'clock-30sec': Ember.inject.service(),

  actions: {
    reset() {
      this.get('clock').reset();
    },
  },
});
