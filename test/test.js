var copy = require('..');
var expect = require('chai').expect;
var temp = require('temp');

describe('copy - simple', function() {
	it('should copy to a temporary directory', function(next) {
		var src = __dirname + '/test.js';
		var dst = temp.path();
		copy(src, dst, function(err) {
			expect(err).to.be.not.ok;
			next();
		});
	});
});
