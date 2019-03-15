import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  clock:         service(),
  'clock-1sec':  service(),
  'clock-5sec':  service(),
  'clock-30sec': service(),

  actions: {
    reset() {
      this.get('clock').reset();
    },
  },
});
