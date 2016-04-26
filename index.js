var fs = require('fs');

module.exports = function(src, dst, callback) {
	fs.createReadStream(src)
		.pipe(fs.createWriteStream(dst))
		.on('error', callback)
		.on('close', callback)
};
