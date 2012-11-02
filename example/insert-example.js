
/*

  This example is showing how to access google calendar with OAuth (version 2).
  After successfully login, the example generate a simple webpage that list all of your calendars' name. 
  
  require - express (http://expressjs.com)
          - restler (https://github.com/danwrong/restler)
  
*/

var util = require('util');
var url  = require('url');
var express  = require('express');

var GoogleCalendar = require('../GoogleCalendar');
var config = require('./config');

var app = express();
app.use(express.cookieParser());
app.use(express.session({
	secret: "skjghskdjfhbqigohqdiouk"
}));
app.listen(8082);

//Create OAuth Instance
var google_calendar = new GoogleCalendar.GoogleCalendar(
  config.consumer_key, 
  config.consumer_secret,
  'http://localhost:8082/authentication'); 

//The redirect URL must be matched!!
app.all('/authentication', function(req, res){
	
	if(!req.query.code){
	  
	  //Redirect the user to Authentication From
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

app.all('/', function(req, res){
  
  var access_token = req.session.access_token;
  
  var output = '<html><head></head><body>';
  var outputEnd = '</body></html>';
  var waiting = 0;
  
  if(!access_token)return res.redirect('/authentication');
  
  google_calendar.listCalendarList(access_token, function(err, data) {

    if(err) return res.send(500,err);
    var calendars = data.items.filter(function(calendar) {
      return calendar.accessRole == 'owner';
    });
    
    var newEvent = {
      start:{ date: '2012-9-12'},
      end:{ date: '2012-9-13'},
    }
    
    var calendar = calendars[0];
    google_calendar.insertEvent(access_token, calendar.id, newEvent, function(err, event) {

      if(err){
        return res.send(500,event);
      } 
      
      output += '<h2>'+ JSON.stringify(event) +'</h2>';
      output += outputEnd;
      return res.send(output);
    });
  });
  
});

