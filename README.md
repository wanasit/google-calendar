Google-Calendar
=======

Google Calendar Connection for Node.js


Installation
=======

To install from npm, run:

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

OAuth Authentication
=======

This module includes [google-oauht](https://github.com/berryboy/google-oauth) for OAuth 2.0 authentication.
If you use framework such as [express](git://github.com/visionmedia/express), you can create OAuht authentication by following :

```javascript

app.all('/authentication', function(req, res){
	
	if(!req.query.code){
	  
	  //Redirect the user to Google's authentication form 
	  google_calendar.getGoogleAuthorizeTokenURL(function(err, redirecUrl) {
  		if(err) return res.send(500,err);
  	  return res.redirect(redirecUrl);
  	});
  	
	}else{
	  //Get access_token from the code
	  google_calendar.getGoogleAccessToken(req.query, function(err, access_token, refresh_token) {
	    
  		if(err) return res.send(500,err);
  		
  		req.session.access_token = access_token;
  		req.session.refresh_token = refresh_token;
  	  return res.redirect('/');
  	});
	}
});

```

Google Calendar Usage
=======

This module (try to) follows [Google Calendar API Reference](https://developers.google.com/google-apps/calendar/v3/reference/).


```javascript

//CalendarList.list
google_calendar.listCalendarList(access_token, function(err, calendarList) {
  
  calendarList.items.forEach(function(calendar) {
    
    //Events.list
    google_calendar.listEvent(access_token, calendar.id, function(err, events) {
      
      console.log('Calendar : ' + calendar.summary)
      events.items.forEach(function(event) {
        console.log('> ' + event.summary)
      });
    });
  });
});

```

Implemented Methods List
=======

Calendar List

- GoogleCalendar.listCalendarList = function(access_token, option, callback) 

- GoogleCalendar.getCalendarList = function(access_token, calendarId, callback)

Events

- GoogleCalendar.listEvent = function(access_token, calendarId, option, callback) 

- GoogleCalendar.insertEvent = function(access_token, calendarId, event, option, callback) 

- GoogleCalendar.getEvent = function(access_token, calendarId, eventId, option, callback)

- GoogleCalendar.deleteEvent = function(access_token, calendarId, eventId, option, callback) 

- GoogleCalendar.updateEvent = function(access_token, calendarId, eventId, event, option, callback)

