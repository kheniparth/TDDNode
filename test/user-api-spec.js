require('co-mocha');
var should = require('should');
var data = require('../user-data.js');
var fs = require('co-fs');
var api = require('../user-web.js');
var request = require('co-supertest').agent(api.listen());

before(function *() {
	yield fs.writeFile('./users.json', '[]');	
});

describe ('user data', function() {
	it ('should have +1 user count after saving', function*() {
		var users = yield data.users.get();
		yield data.users.save({ name: 'John'});

		var newUsers = yield data.users.get();

		newUsers.length.should.equal(users.length + 1);
	});
});

describe ('web data', function() {
	it ('should have +1 user count after saving', function *() {
		var res = yield request.get('/user').expect(200).end();
		var users = res.body;
		yield res.users.save({ name: 'John'});
		var newRes = yield request.get('/user').expect(200).end();
		var newUsers = newRes.body;

		newUsers.length.should.equal(users.length + 1);

	})
});