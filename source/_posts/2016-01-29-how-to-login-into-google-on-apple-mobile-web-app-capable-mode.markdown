---
layout: post
title: "How to login into google on apple-mobile-web-app-capable mode"
date: 2016-01-29 22:59:27 +0000
comments: true
categories: 
---

I was making web applications and testing it on iOS with `apple-mobile-web-app-capable mode` meta tag.
I discovered that user can not login into Google accaunt with gapi via:

```javascript
var conf = {
    client_id: id,
    scope: scope,
    immediate: false
};
gapi.auth.authorize(conf, callback);
```

Looks like iOS blocks popup login message.
It is possible to avoid such behaviour with authorization with full page redirect:

```javascript
var href = 'https://accounts.google.com/o/oauth2/auth?redirect_uri=http%3A%2F%2F' +
 redirectURL + '&response_type=code&client_id=' + id + '&' +
 'scope=' +
 'https://www.googleapis.com/auth/drive.file%20' +
 'https://www.googleapis.com/auth/drive.install%20' + 'https://www.googleapis.com/auth/userinfo.profile';

// first try to immediate login without popup. May be user already logged?
var conf = {
    client_id: id,
    scope: scope,
    immediate: true
};
gapi.auth.authorize(conf, function(authResult) {
	// if everything is ok go on
	if (authResult && !authResult.error) {
    	defer.resolve(authResult);
	} else {
    	// can not do immediate login
    	// if we have on `apple-mobile-web-app-capable` mode we should redirect to google login page
    	if (window.navigator.standalone) {
        	window.location.href = href;
    	} else {
	        // use usual login API from gapi.
	        conf.immediate = false;
	        gapi.auth.authorize(conf, (authResult) => {
	            if (authResult) {
	                defer.resolve(authResult);
	            } else {
	                defer.reject(authResult);
	            }
	        });
	    }
	}
});
```

Done!
