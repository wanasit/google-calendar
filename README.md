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

Running Tests
=======

This library uses [mocha](http://visionmedia.github.io/mocha/) test framework. 
All test files are included in folder `/specs`. 

To run the test, you need to install the dev-dependecies.

```
npm install -d
```

You also need fill `/specs/config.js` with API key and refreash_token. See. [Google's document on OAuth2](https://developers.google.com/accounts/docs/OAuth2)

Note: The process to get those createncials is still complicated, I'll improve this later. 

```
module.exports = {
		
	 consumer_key   : 'CONSUMER_KEY',
   consumer_secret  : 'CONSUMER_SECRET',
   refresh_token    : 'REFEASH_TOKEN',
}
```

The testcase involve calling Google Calendar and take long time to complete. Thus, running mocha with high timeout parameter (more than 6 seconds) is recommended. 

```
mocha ./specs --timeout 6000
```

