
exports.GoogleCalendar = GoogleCalendar;

var util   = require('util');
var querystring = require('querystring');

var OAuth = require('google-oauth');
var rest = require('restler');

function GoogleCalendar(consumer_key, consumer_secret,callback_url){
  this.key = consumer_key;
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
  
  if(body && typeof body == 'object'){
    body = JSON.stringify(body)
  } 
  
  callback = callback || function(){};
  option = option || {};
  option.access_token = access_token;
  option.key = this.key;
  
  var restRequest = null;
  var requestOption = { query:option, parser:rest.parsers.json };
  if(body){
    requestOption.data = body;
    requestOption.headers = {};
    requestOption.headers['content-type'] = 'application/json';
  }  
  
  switch(type.toLowerCase()){
    
    case 'del':
    case 'delete': 
        restRequest = rest.del(url, requestOption);
      break;
      
    case 'put': restRequest = rest.put(url, requestOption);
      break;
    
    case 'post': restRequest = rest.post(url, requestOption);
      break;
    
    default : restRequest = rest.get(url, requestOption);
  }
  

  restRequest.on('complete', function(result, response ) {
    
    if(result instanceof Error || response.statusCode != 200){  
      return callback(result, response.rawEncoded);
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
  
  return this.sendRequest('get', 'https://www.googleapis.com/calendar/v3/calendars/'+encodeURIComponent(calendarId)+'/events', 
    access_token, option, callback);
}

GoogleCalendar.prototype.insertEvent = function(access_token, calendarId, event, option, callback) {
  
  if(arguments.length < 5){
    callback = option;
    option = {};
  }
  
  return this.sendRequest('post', 'https://www.googleapis.com/calendar/v3/calendars/'+encodeURIComponent(calendarId)+'/events', 
    access_token, option, event, callback);
}

GoogleCalendar.prototype.getEvent = function(access_token, calendarId, eventId, option, callback) {
  
  return this.sendRequest('get', 'https://www.googleapis.com/calendar/v3/calendars/'+encodeURIComponent(calendarId)+'/events/'+eventId, 
    access_token, option, callback);
}

GoogleCalendar.prototype.deleteEvent = function(access_token, calendarId, eventId, option, callback) {
  
  return this.sendRequest('delete', 'https://www.googleapis.com/calendar/v3/calendars/'+encodeURIComponent(calendarId)+'/events/'+eventId, 
    access_token, option, callback);
}

GoogleCalendar.prototype.updateEvent = function(access_token, calendarId, eventId, event, option, callback) {
  
  return this.sendRequest('put', 'https://www.googleapis.com/calendar/v3/calendars/'+encodeURIComponent(calendarId)+'/events/'+eventId, 
    access_token, option, event, callback);
}


