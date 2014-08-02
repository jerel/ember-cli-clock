import Ember from 'ember';

export default Ember.Object.extend({
  intervalTime: 1000,
  second: 0,
  minute: 0,
  five: 0,
  quarter: 0,
  hour: 0,
  init: function() {
    var self = this,
        interval = window.setInterval(function() {
          self.tick.call(self);
        }, this.get('intervalTime'));
    this.set('interval', interval);
  },
  reset: function() {
    this.willDestroy();
    this.init();
    this.setProperties({second: 0, minute: 0, five: 0, quarter: 0, hour: 0});
  },
  intervalChange: function() {
    if (Ember.testing) {
      return this.reset();
    }
    throw Error('The clock interval cannot be changed except during testing');
  }.observes('intervalTime'),
  tick: function() {
    Ember.run(this, function() {
      var second = this.incrementProperty('second');

      if (second && (second % 60) === 0) {
        var minute = this.incrementProperty('minute');

        if (minute !== 0) {
          if ((minute % 5) === 0) {
            this.incrementProperty('five');
          }

          if ((minute % 15) === 0) {
            this.incrementProperty('quarter');
          }

          if ((minute % 60) === 0) {
            this.incrementProperty('hour');
          }
        }
      }
    });
  },
  willDestroy: function() {
    window.clearInterval(this.get('interval'));
  }
});
