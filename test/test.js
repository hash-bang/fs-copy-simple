var copy = require('..');
var expect = require('chai').expect;
var temp = require('temp').track();

describe('copy()', function() {
	it('file -> file', function(next) {
		var src = __dirname + '/test.js';
		var dst = temp.path();
		copy(src, dst, function(err) {
			expect(err).to.be.not.ok;
			next();
		});
	});

	it('file -> dir', function(next) {
		var src = __dirname + '/test.js';
		temp.mkdir('fs-copy-simple-1', function(err, dst) {
			if (err) return next(err);
			copy(src, dst, function(err) {
				expect(err).to.be.not.ok;
				next();
			});
		});
	});

	it('file (non existant) -> file (=error)', function(next) {
		var src = __dirname + '/test.blah.js';
		var dst = temp.path();
		copy(src, dst, function(err) {
			expect(err).to.be.ok;
			next();
		});
	});

	it('dir -> dir (=error)', function(next) {
		temp.mkdir('fs-copy-simple-2', function(err, src) {
			if (err) return next(err);
			temp.mkdir('fs-copy-simple-3', function(err, dst) {
				if (err) return next(err);
				copy(src, dst, function(err) {
					expect(err).to.be.ok;
					next();
				});
			});
		});
	});
});
