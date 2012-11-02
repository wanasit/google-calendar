Google-Calendar
=======

Google Calendar Connection for Node.js



Installation
=======

To install the most recent release from npm, run:


```shell
npm install google-calendar
```

To use the Google Calendar API, you need consumer_key and consumer_secret to initiate the module:

```javascript

var GoogleCalendar = require('google-calendar');
var google_calendar = new GoogleCalendar.GoogleCalendar(
  config.consumer_key, 
  config.consumer_secret,
  'http://localhost:8082/authentication');
  
```



