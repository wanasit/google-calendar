exports.GoogleCalendar = GoogleCalendar;

var util   = require('util');
var needle = require('needle');

function GoogleCalendar(access_token){
  
  this.request  = function(type, path, params, options, body, callback) {  
    
    var url = 'https://www.googleapis.com/calendar/v3'+path+'?access_token='+access_token;
    
    params = params || {}
    options = options || {}
    options.json = true;
    
    type = type.toUpperCase();
    if(typeof body !== 'string') body = JSON.stringify(body);
    
    
    for(var k in params){
      url += '&'+encodeURIComponent(k)+'='+ encodeURIComponent(params[k]);
    }
    
    if(type == 'GET')
      needle.get(url, options, responseHandler)
    else if(type == 'DELETE')
      needle.delete(url, options, responseHandler)
    else if(type == 'POST')
      needle.post(url, body, options, responseHandler)
    else if(type == 'PUT')
      needle.put(url, body, options, responseHandler)
    else
      throw new Error('Unrecognized HTTP operation');
    
    function responseHandler(error, response, body) {
      if(error) return callback(error, body);
      if(body.error) return callback(body.error, null);
      return callback(null, body);
    }
  };
  
  this.acl      = new Acl(this.request);
  this.calendarList = new CalendarList(this.request);
  this.calendars = new Calendars(this.request);
  this.events   = new Events(this.request);
  this.freebusy = new Freebusy(this.request);
  this.settings = new Settings(this.request);
}

// Acl
function Acl(request){ this.request = request; }

Acl.prototype.delete = function(calendarId, ruleId, callback) {
  this.request('DEL', '/calendars/' + calendarId + '/acl/' + ruleId, 
    {}, {}, null, callback);
}

Acl.prototype.get = function() {
  
}

Acl.prototype.insert = function() {
  
}

Acl.prototype.list = function() {
  
}

Acl.prototype.update = function() {
  
}

Acl.prototype.patch = function() {
  
}



// CalendarList
function CalendarList(request){ this.request = request; }

CalendarList.prototype.delete = function() {
  this.request('DEL', '/calendars/' + calendarId + '/acl/' + ruleId, 
    {}, {}, null, callback);
}

CalendarList.prototype.get = function() {
  
}

CalendarList.prototype.insert = function() {
  
}

CalendarList.prototype.list = function(option, callback) {
  
  if(!callback){ callback = option; option = {} }
  this.request('GET', '/users/me/calendarList', option, {}, null, callback);
}

CalendarList.prototype.update = function() {
  
}

CalendarList.prototype.patch = function() {
  
}



// Calendars
function Calendars(request){ this.request = request; }

Calendars.prototype.clear = function() {
  
}

Calendars.prototype.delete = function() {
  
}

Calendars.prototype.get = function() {
  
}

Calendars.prototype.insert = function() {
  
}

Calendars.prototype.update = function() {
  
}

Calendars.prototype.patch = function() {
  
}



// Events
function Events(request){ this.request = request; }


Events.prototype.delete = function(calendarId, eventId, option, callback) {
  
  if(!callback){ callback = option; option = {}; }
  
  calendarId = encodeURIComponent(calendarId);
  eventId    = encodeURIComponent(eventId);
  
  this.request('DELETE', '/calendars/'+calendarId+'/events/'+eventId, 
    option, {}, null, callback);
}

Events.prototype.get = function(calendarId, eventId, option, callback) {
  
  if(!callback){ callback = option; option = {}; }
  
  calendarId = encodeURIComponent(calendarId);
  eventId    = encodeURIComponent(eventId);
  
  this.request('GET', '/calendars/'+calendarId+'/events/'+eventId, 
    option, {}, null, callback);
}

Events.prototype.import = function(calendarId, event, option, callback) {
  
  if(!callback){ callback = option; option = {}; }
  
  calendarId = encodeURIComponent(calendarId);
  
  this.request('POST', '/calendars/'+calendarId+'/events/import', 
    option, {}, event, callback);
}

Events.prototype.insert = function(calendarId, event, option, callback) {
  
  if(!callback){ callback = option; option = {}; }
  
  calendarId = encodeURIComponent(calendarId);
  
  this.request('POST', '/calendars/'+calendarId+'/events', 
    option, {}, event, callback);
}

Events.prototype.instances = function(calendarId, eventId, option, callback) {
  
  if(!callback){ callback = option; option = {}; }
  
  calendarId = encodeURIComponent(calendarId);
  eventId    = encodeURIComponent(eventId);
  
  this.request('GET', '/calendars/'+calendarId+'/events/'+eventId+'/instances', 
    option, {}, null, callback);
}

Events.prototype.list = function(calendarId, option, callback) {
  
  if(!callback){ callback = option; option = {}; }
  
  calendarId = encodeURIComponent(calendarId);
  
  this.request('GET', '/calendars/'+calendarId+'/events', 
    option, {}, null, callback);
}

Events.prototype.move = function(calendarId, eventId, option, callback) {
  
  if(!callback){ callback = option; option = {}; }
  
  calendarId = encodeURIComponent(calendarId);
  eventId    = encodeURIComponent(eventId);
  
  this.request('POST', '/calendars/'+calendarId+'/events/'+eventId+'/move', 
    option, {}, null, callback);
}

Events.prototype.quickAdd = function(calendarId, text, option, callback) {
  
  if(!callback){ callback = option; option = {}; }
  
  option.text = text;
  calendarId = encodeURIComponent(calendarId);
  
  this.request('POST', '/calendars/'+calendarId+'/events/quickAdd', 
    option, {}, null, callback);
}

Events.prototype.update = function(calendarId, eventId, update, option, callback) {
  
  if(!callback){ callback = option; option = {}; }
  
  calendarId = encodeURIComponent(calendarId);
  eventId    = encodeURIComponent(eventId);
  
  this.request('POST', '/calendars/'+calendarId+'/events/'+eventId, 
    option, {}, update, callback);
}

Events.prototype.patch = function(calendarId, eventId, patch, option, callback) {
  if(!callback){ callback = option; option = {}; }
  
  calendarId = encodeURIComponent(calendarId);
  eventId    = encodeURIComponent(eventId);
  
  this.request('POST', '/calendars/'+calendarId+'/events/'+eventId, 
    option, {}, patch, callback);
}



// Freebusy
function Freebusy(request){ this.request = request; }

Freebusy.prototype.query = function() {
  
}



// Settings
function Settings(request){ this.request = request; }


Settings.prototype.set = function() {
  
}

Settings.prototype.get = function() {
  
}


