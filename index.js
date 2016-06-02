var _ = require('lodash');
var async = require('async-chainable');
var fs = require('fs');
var fspath = require('path');

/**
* Copy a single file either to a specified path or to an existing directory
* @param {string|Buffer} src The source path. Must be a single file path or buffer
* @param {string} dst The destination path. Can either be a destination file path or the directory (in which case the same file name is used)
* @param {function} callback The callback to execute on completion with an optional error
*/
function copy(src, dst, callback) {
	async()
		.parallel({
			srcStat: function(next) {
				if (_.isBuffer(src)) return next();
				fs.stat(src, function(err, stat) {
					next(null, err ? null : stat);
				});
			},
			dstStat: function(next) {
				fs.stat(dst, function(err, stat) {
					next(null, err ? null : stat);
				});
			},
		})
		.then(function(next) {
			if (_.isBuffer(src) && this.dstStat && this.dstStat.isDirectory()) { // Buffer -> Dir
				next('Buffer -> Dir copy is not supported');
			} else if (_.isBuffer(src)) { // Buffer -> File
				fs.writeFile(dst, src, next);
			} else if (this.srcStat && this.srcStat.isDirectory() && this.dstStat && this.dstStat.isDirectory()) { // Dir -> Dir copy
				next('Dir -> Dir copy is not supported');
			} else if (this.srcStat && this.srcStat.isDirectory()) { // Dir -> File (!?)
				next('Cannot copy a directory into an existing file, remove the destination file first');
			} else if (this.dstStat && this.dstStat.isDirectory()) { // File -> Dir
				dst += '/' + fspath.basename(src);
				copyFile(src, dst, next);
			} else if (this.srcStat) { // File -> File
				copyFile(src, dst, next);
			} else {
				next('Source file not found or is inaccessible');
			}
		})
		.end(callback);
}


/**
* Copy a single file
* This function performs absolutely no sanity checks and is only really useful if you know the exact source and destination file paths
* @param {string} src The source path
* @param {string} dst The destination path
* @param {function} callback The callback to execute on completion with an optional error
*/
function copyFile(src, dst, callback) {
	fs.createReadStream(src)
		.pipe(fs.createWriteStream(dst))
		.on('error', callback)
		.on('close', callback)
}

module.exports = copy;
module.exports.copyFile = copyFile;
