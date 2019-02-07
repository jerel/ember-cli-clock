import Service from '@ember/service';
import { computed, observer } from '@ember/object';
import { run } from '@ember/runloop';
import Ember from 'ember';

export default Service.extend({

  interval:     1000,
  intervalTime: 1000,
  second:       0,
  minute:       0,
  five:         0,
  quarter:      0,
  hour:         0,
  time:         null,

  date: computed('time', function() {
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

  onIntervalChange: observer('interval', function() {
    this.stop();
    this.start();
  }),

  update() {
    run(() => this.set('time', Date.now()));
  },

  reset() {
    this.stop();
    this.setProperties({second: 0, minute: 0, five: 0, quarter: 0, hour: 0});
    this.start();
  },

  intervalChange: observer('intervalTime', function() {
    if (Ember.testing) {
      this.set('interval', this.get('intervalTime'));
      return this.reset();
    }
    throw Error('The clock interval cannot be changed except during testing');
  }),

  timeChange: observer('time', function() {
    this.tick();
  }),

  tick() {
    let second = this.incrementProperty('second');

    if (second && (second % 60) === 0) {
      let minute = this.incrementProperty('minute');

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
