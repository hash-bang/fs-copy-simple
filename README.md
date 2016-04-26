fs-copy-simple
==============
Exceptionally simple module to just copy-the-damn-file. No globs, just copy.

Pretty much everything that is not a valid input and output file name will callback with an error.

Written in frustration that all NPM copy libraries seem to spend an inordinate amount of time doing complex globbing and other fluff.


copy(src, dst, callback)
========================
Pass in a source path, a destination path and a callback for errors. Thats it.
