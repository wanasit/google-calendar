
exports.GoogleCalendar = GoogleCalendar;

var util   = require('util');
var querystring = require('querystring');

var OAuth = require('google-oauth');
var rest = require('restler');

function GoogleCalendar(consumer_key, consumer_secret,callback_url){
  
  this.oauth = new OAuth.OAuth2(
    consumer_key, 
    consumer_secret,
    callback_url);
}

GoogleCalendar.prototype.getGoogleAuthorizeTokenURL = function(callback) {
	return this.oauth.getGoogleAuthorizeTokenURL(['https://www.googleapis.com/auth/calendar'], callback)
}

GoogleCalendar.prototype.getGoogleAccessToken = function(params, callback) {
	return this.oauth.getGoogleAccessToken(params, callback)
}

GoogleCalendar.prototype.sendRequest = function(type, url, access_token, option, body, callback) {
  
  if(callback == null && body==null) {
    callback = option;
    option = null;
    body = null;
  }
  else if(callback == null) {
    callback = option;
    option = null;
    body = null;
  }
  callback = callback || function(){};
  option = option || {};
  option.access_token = access_token;
    
  var restRequest = null;
  switch(type.toLowerCase()){
    
    case 'del':
    case 'delete': 
        restRequest = rest.del(url, {query:option, data:body, parser:rest.parsers.json});
      break;
      
    case 'put': restRequest = rest.put(url, {query:option, data:body, parser:rest.parsers.json});
      break;
    
    case 'post': restRequest = rest.post(url, {query:option, data:body, parser:rest.parsers.json});
      break;
    
    default : restRequest = rest.get(url, {query:option, data:body, parser:rest.parsers.json});
  }
  

  restRequest.on('complete', function(result, response ) {
        
    if(result instanceof Error || response.statusCode != 200){  
      return callback(result, null);
    }
    
    return callback(null, result);
  })
}

// Calendar List

GoogleCalendar.prototype.listCalendarList = function(access_token, option, callback) {
  
  return this.sendRequest('get','https://www.googleapis.com/calendar/v3/users/me/calendarList', access_token, option, callback)
} 

GoogleCalendar.prototype.getCalendarList = function(access_token, calendarId, callback) {
  
  return this.sendRequest('get','https://www.googleapis.com/calendar/v3/users/me/calendarList/'+calendarId, access_token, option, callback)
}

// Events

GoogleCalendar.prototype.listEvent = function(access_token, calendarId, option, callback) {
  
  return this.sendRequest('get', 'https://www.googleapis.com/calendar/v3/calendars/'+calendarId+'/events', 
    access_token, option, callback);
}

GoogleCalendar.prototype.insertEvent = function(access_token, calendarId, event, option, callback) {
  
  return this.sendRequest('post', 'https://www.googleapis.com/calendar/v3/calendars/'+calendarId+'/events', 
    access_token, option, event, callback);
}

GoogleCalendar.prototype.getEvent = function(access_token, calendarId, eventId, option, callback) {
  
  return this.sendRequest('get', 'https://www.googleapis.com/calendar/v3/calendars/'+calendarId+'/events'+eventId, 
    access_token, option, callback);
}

GoogleCalendar.prototype.deleteEvent = function(access_token, calendarId, eventId, option, callback) {
  
  return this.sendRequest('delete', 'https://www.googleapis.com/calendar/v3/calendars/'+calendarId+'/events'+eventId, 
    access_token, option, callback);
}

GoogleCalendar.prototype.updateEvent = function(access_token, calendarId, eventId, event, option, callback) {
  
  return this.sendRequest('put', 'https://www.googleapis.com/calendar/v3/calendars/'+calendarId+'/events'+eventId, 
    access_token, option, event, callback);
}


