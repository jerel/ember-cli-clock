/*jshint node:true*/

module.exports = {
  description: 'Generates an ember-cli-clock service.',

  availableOptions: [
    { name: 'interval', type: Number, default: 1000 }
  ],

  locals: function(options) {
    return {
      interval: options.interval
    };
  }
};
