import Ember from 'ember';
import TimestampClock from 'ember-cli-clock/services/timestamp-clock';

export default TimestampClock.extend({
  intervalTime: 1000,
  second: 0,
  minute: 0,
  five: 0,
  quarter: 0,
  hour: 0,

  reset() {
    this.stop();
    this.setProperties({second: 0, minute: 0, five: 0, quarter: 0, hour: 0});
    this.start();
  },

  intervalChange: Ember.observer('intervalTime', function() {
    if (Ember.testing) {
      this.set('interval', this.get('intervalTime'));
      return this.reset();
    }
    throw Error('The clock interval cannot be changed except during testing');
  }),

  timeChange: Ember.observer('time', function() {
    this.tick();
  }),

  tick() {
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
  }
});
