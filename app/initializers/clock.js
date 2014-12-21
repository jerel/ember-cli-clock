import Clock from '../services/clock';

export default {
  name: 'clock',
  initialize: function(container, app) {
    app.register('clock:main', Clock);
    app.inject('controller', 'clock', 'clock:main');
    app.inject('component', 'clock', 'clock:main');
  }
};
