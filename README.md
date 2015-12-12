# TescoJS

A wrapper script for the tesco labs API. Need to be registered at https://secure.techfortesco.com/tescoapiweb to continue

# Usage

## Download via npm

```javascript
npm install tescojs
```

## Require Library

```javascript
var tescojs = require('tescojs');
```

## Login

```javascript

var loginDetails = {
	"email": "test@test.com",
	"password": "password",
	"appKey": "key",
	"devKey": "key",
}
tescojs.login(loginDetails, function(err, sessionKey){
	//returns a session key for all future functions
});

```

## Product Search

Search for a product by name or barcode. Will return page 1 by default

```javascript
var options = {
	"product": '5000237112236' or "product": 'Ready Salted Crisps',
	"sessionKey": 'sessionKey',
	"pageNumber": '1'
}
tescojs.search(options, function(err, data){
	//returns an array of products
});
```
