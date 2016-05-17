var copy = require('..');
var fs = require('fs');
var expect = require('chai').expect;
var temp = require('temp').track();

describe('copy() with buffers', function() {
	it('buffer -> path', function(next) {
		var src = __dirname + '/buffers.js';
		var dst = temp.path();
		fs.readFile(src, function(err, buf) {
			copy(buf, dst, function(err) {
				expect(err).to.be.not.ok;
				next();
			});
		});
	});

	it('buffer -> dir (=error)', function(next) {
		var src = __dirname + '/buffers.js';
		temp.mkdir('fs-copy-simple-3', function(err, dst) {
			fs.readFile(src, function(err, buf) {
				copy(buf, dst, function(err) {
					expect(err).to.be.ok;
					next();
				});
			});
		});
	});
});
