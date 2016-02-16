import Ember from 'ember';

export default Ember.Service.extend({
  interval: 1000,

  time: null,
  date: Ember.computed('time', function() {
    return new Date(this.get('time'));
  }),

  init() {
    this._super(...arguments);
    this.start();
  },

  start() {
    this.update();
    this.set('intervalId', window.setInterval(() => this.update(), this.get('interval')));
  },

  stop() {
    window.clearInterval(this.get('intervalId'));
  },

  willDestroy() {
    this._super(...arguments);
    this.stop();
  },

  onIntervalChange: Ember.observer('interval', function() {
    this.stop();
    this.start();
  }),

  update() {
    Ember.run(() => this.set('time', Date.now()));
  }
});
