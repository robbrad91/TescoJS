var expect = require("chai").expect;
var tescojs = require('../index.js');

describe('Login', function() {
	it('Missing login details should return error', function() {
  		var loginDetails = {
			"email": "test@test.com",
			"appKey": "AAABBBCCCDDDD",
			"devKey": "AAABBBCCCDDDD",
		}
		tescojs.login(loginDetails, function(err, data){
			expect(err).exist
		});
	});
});

describe('Search', function() {
	it('Missing options should return error', function() {
  		var options = {
			"product": '5000237112236',
			"pageNumber": '1'
		}
		tescojs.search(options, function(err, data){
			expect(err).exist
		});
	});
});