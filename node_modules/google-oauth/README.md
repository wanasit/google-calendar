GoogleOAuth
=======

Simplified OAuth helper for Google APIs


Example
=======

```javascript

var OAuth = require('../GoogleOAuth');
var oauth = new OAuth.OAuth2(
  consumer_key, 
  consumer_secret, 
  'http://localhost:8082/authentication'); 

server.get('/authentication', function(req, res){

	if(!req.query.code){

	  //Redirect the user to Authentication From
	  oauth.getGoogleAuthorizeTokenURL( ['https://www.googleapis.com/auth/calendar'], function(err, redirecUrl) {
  		if(err) return res.send(500,err);
  	  return res.redirect(redirecUrl);
  	});

	}else{
	  //Get access_token from the code
	  oauth.getGoogleAccessToken(req.query, function(err, access_token, refresh_token) {
  		if(err) return res.send(500,err);

  		req.session.access_token = access_token;
  		req.session.refresh_token = refresh_token;
  	  return res.redirect('/');
  	});
	}
});

```