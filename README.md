# ember-cli-clock

[![Build Status](https://travis-ci.org/jerel/ember-cli-clock.svg?branch=master)](https://travis-ci.org/jerel/ember-cli-clock)

A simple clock service for Ember.js


## Live Demo

View a live demo here: <http://clock.jerel.co/>


## Installation

`ember install ember-cli-clock`


## Usage

1. Generate a clock service

   `ember generate clock my-shiny-new-clock`

2. Inject the `my-shiny-new-clock` service into your component, controller,
   route, ...

   `clock: service('my-shiny-new-clock')`

3. Use the `time` (`Date.now()`) and `date` (`Date` instance) properties
   of the clock service 


## Examples

```js
// app/components/iso-date.js
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  clock: service('my-shiny-new-clock'),

  iso: computed('clock.date', function() {
    return this.get('clock.date').toISOString();
  })
});
```

Using `{{iso}}` in the template will output something like 
`2011-10-05T14:48:00.000Z` and update it every second.


```js
// app/components/device-status.js
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  clock: service('my-shiny-new-clock'),

  isOnline: computed('lastContact', 'clock.time', function() {
    return this.get('clock.time') - this.get('lastContact') < 60 * 1000;
  })
});
```

The `isOnline` property is updated every second and will tell
if the last contact of the device was less than 60 seconds ago.


## API

### Properties

- `interval` (default: 1000ms) - the update interval of `time` and `date`
- `time` (read-only) - will be set to `Date.now()` every `interval` milliseconds
- `date` (read-only) - computed property: `new Date(this.get('time'))`

### Methods

- `start()` - starts the clock after it has been stopped
- `stop()` - stops the clock from updating `time` and `date` until restarted


## Authors

* [Jerel Unruh](http://twitter.com/jerelunruh/)
* [Tobias Bieniek](https://github.com/Turbo87)
* [Andy Rohr](https://github.com/arohr)

## Legal

Copyright (c) 2014 Jerel Unruh and contributors

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
