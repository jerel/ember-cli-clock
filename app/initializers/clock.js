import Clock from '../services/clock';

export default {
  name: 'clock',
  initialize: function() {
    var app = arguments[1] || arguments[0];
    app.register('clock:main', Clock);
    app.inject('controller', 'clock', 'clock:main');
    app.inject('component', 'clock', 'clock:main');
  }
};
