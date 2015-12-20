var https = require('https');

module.exports = {
  login: function(loginDetails, cb) {
    //https://secure.techfortesco.com/tescolabsapi/restservice.aspx?command=LOGIN&email=nick@example.com&password=secret&developerkey=HgQuT6GHye3C6jklhj65&applicationkey=ECI987G56FF417663A05
    var options = {
        "email": "",
        "password": "",
        "appKey": "",
        "devKey": "",
    }

    var invalidLoginDetails = 'Incorrect format for login details passed';
    var invalidLoginError = 'Invalid login details';
    
    var unknownError = 'Unknown reponse from API';

    // replace defaults with passed in options
    for (var key in loginDetails) {
        if ((options.hasOwnProperty(key)) && (loginDetails.hasOwnProperty(key))) {
            options[key] = loginDetails[key];
        }
    }
    // validate the passed in login details
    if(options.email.length == 0 || options.password.length == 0 || options.appKey.length == 0 || options.devKey.length == 0) return cb(new Error(invalidLoginDetails), null);

    var http_options = {
        host: 'secure.techfortesco.com',
        port: 443,
        path: '/tescolabsapi/restservice.aspx?command=LOGIN&email='+options.email+'&password='+options.password+'&developerkey='+options.devKey+'&applicationkey='+options.appKey,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    //console.log(http_options);
    https.get(http_options, function (res) {
        var responseData = '';

        res.setEncoding('utf8');
        res.on('data', function (data) {
            responseData += data;
        });
        res.on('end', function () {
            var data = JSON.parse(responseData);
            //console.log('success: ' + JSON.stringify(data));    
            if(data.StatusCode == '200') {
                return cb(new Error(invalidLoginError), null);
            }
            if(data.StatusCode == '150') {
                return cb(new Error(invalidKeys), null);
            }
            if(data.StatusCode == '0') {
                return cb(null, data.SessionKey);
            }
        });
        res.on('error', function (error) {
            // handle error
            console.log('error: ' + JSON.stringify(error));
            return cb(error.message, null);
        });
    });
  },
  search: function(searchOptions, cb) {
    var options = {
        "product": "",
        "sessionKey": "",
        "page": "1"
    }
    var invalidOptions = 'Invalid options passed';
    var invalidSessionKey = 'Invalid session or API key';
    var unknownError = 'Unknown reponse from API';

    // replace defaults with passed in options
    for (var key in searchOptions) {
        if ((options.hasOwnProperty(key)) && (searchOptions.hasOwnProperty(key))) {
            options[key] = searchOptions[key];
        }
    }
    // validate the passed in login details
    if(options.product.length == 0 || options.sessionKey.length == 0 || options.page.length == 0) return cb(new Error(invalidOptions), null);
    //https://secure.techfortesco.com/tescolabsapi/restservice.aspx?command=PRODUCTSEARCH&searchtext=chocolate&page=1&sessionkey=JXM3UBD4FgpokEtbhmpCB9nT4TYCOcQz6LkfRKfVS33NRSuRE4
    var http_options = {
        host: 'secure.techfortesco.com',
        port: 443,
        path: '/tescolabsapi/restservice.aspx?command=PRODUCTSEARCH&searchtext=' + options.product + '&page=' + options.page + '&sessionkey=' + options.sessionKey,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    //console.log(http_options);
    https.get(http_options, function (res) {
        var responseData = '';

        res.setEncoding('utf8');
        res.on('data', function (data) {
            responseData += data;
        });
        res.on('end', function () {
            var data = JSON.parse(responseData);
            var sd = data.StatusCode;
            if(sd == 0) {
                //success
                return cb(null, data.Products); 
            }
            if(sd == '150' || sd == '115' || sd == '120') {
                return cb(new Error(invalidSessionKey), null);
            }
        });
        res.on('error', function (error) {
            // handle error
            return cb(error.message, null);
        });
    });
  }
}