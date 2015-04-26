# Fronted for bearded-web
[![Build Status](https://travis-ci.org/bearded-web/frontend.svg?branch=master)](https://travis-ci.org/bearded-web/frontend)
[![Dependencies](https://david-dm.org/bearded-web/frontend.svg)](https://david-dm.org/bearded-web/frontend)
[![Coverage status](http://codecov.io/github/bearded-web/frontend/coverage.svg?branch=master)](http://codecov.io/github/bearded-web/frontend?branch=master)

Use ReactJS for build interface.
Builded code in [dist](dist) folder.

## Development

For develop you need [iojs][iojs] and NPM (shipped with iojs).
Node is not an options because [jsdom][jsdom] works only with iojs.  

For detail usage, see [Makefile](Makefile)


[iojs]: https://iojs.org/en/index.html  "io.js"
[jsdom]: https://github.com/tmpvar/jsdom "jsdom"
