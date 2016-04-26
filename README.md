fs-copy-simple
==============
Exceptionally simple module to just **copy-the-damn-file**. No globs, no weirdness, just copy.

Pretty much everything that is not a valid input and output file name will callback with an error.

Written in frustration that all NPM copy libraries seem to spend an inordinate amount of time doing complex globbing and other fluff. If you want entire directory tree copying either use a higher level library such as [fs-extra](https://github.com/jprichardson/node-fs-extra) or couple this module with something that can recuse like [file-emitter](https://www.npmjs.com/package/file-emitter).


	copy('/something/somewhere.thing', '/something/somewhere.else', function(err) {
		console.log('Copied with error:', err);
	});



copy(src, dst, callback)
========================
Pass in a source path, a destination path (or directory) and a callback for errors. Thats it.

This function will error on non-existant files, trying to copy a directory to another directory or pretty much anything thats not a valid source file to either a destination path OR a directory to copy into.
