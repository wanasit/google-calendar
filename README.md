Google-Calendar
=======

Google Calendar library for Node.js

```javascript
npm install google-calendar
```

#### For 0.0.x users

This module (1.x.x) has been redesigned completely. So, it incompatible with the old version. The 0.0.x version is moved to branch name [v0](https://github.com/berryboy/google-calendar/tree/v0).

Usage
=======

#### AccessToken & Authentication

This library requires Google API's [Acceess Token](https://developers.google.com/accounts/docs/OAuth2) with calendars [scope](https://developers.google.com/google-apps/calendar/auth).

```javascript
var gcal = require('google-calendar');
var google_calendar = new gcal.GoogleCalendar(accessToken);
```

To get `accessToken`, use other authentication framework such as [passport](https://github.com/jaredhanson/passport) (recommended, but not required) for OAuth 2.0 authentication. You can take look at example code in [example](https://github.com/berryboy/google-calendar/tree/master/example) folder.

```javascript
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');
var gcal     = require('google-calendar');

passport.use(new GoogleStrategy({
    clientID: config.consumer_key,
    clientSecret: config.consumer_secret,
    callbackURL: "http://localhost:8082/auth/callback",
    scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar'] 
  },
  function(accessToken, refreshToken, profile, done) {
    
    //google_calendar = new gcal.GoogleCalendar(accessToken);
    
    return done(null, profile);
  }
));
```

#### API Usage

This library follows [Google Calendar API v3 Reference](https://developers.google.com/google-apps/calendar/v3/reference/).

```javascript
GoogleCalendar.Resource.Method( required_param1, required_param2, optional, callback )
```

For example

```javascript

var google_calendar = new gcal.GoogleCalendar(accessToken);

google_calendar.calendarList.list(function(err, calendarList) {
  
  ...
  
  google_calendar.events.list(calendarId, function(err, calendarList) {
    
    ...
  });
});

```

Implemented Methods List
=======

Calendar List

- GoogleCalendar.calendarList.list = function(option, callback)

Events (Complete)

- GoogleCalendar.events.delete = function(calendarId, eventId, option, callback)
- GoogleCalendar.events.get    = function(calendarId, eventId, option, callback)
- GoogleCalendar.events.import = function(calendarId, eventId, option, callback)
- GoogleCalendar.events.insert = function(calendarId, event, option, callback)
- GoogleCalendar.events.instances = function(calendarId, eventId, option, callback)
- GoogleCalendar.events.list = function(calendarId, option, callback)
- GoogleCalendar.events.move = function(calendarId, eventId, option, callback)
- GoogleCalendar.events.quickAdd = function(calendarId, text, callback)
- GoogleCalendar.events.update = function(calendarId, eventId, event, option, callback)
- GoogleCalendar.events.patch	 = function(calendarId, eventId, patch, option, callback)

