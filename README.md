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


## Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally
* Consider starting the commit message with an applicable emoji:
    * :lipstick: `:lipstick:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :non-potable_water: `:non-potable_water:` when plugging memory leaks
    * :memo: `:memo:` when writing docs
    * :penguin: `:penguin:` when fixing something on Linux
    * :apple: `:apple:` when fixing something on Mac OS
    * :checkered_flag: `:checkered_flag:` when fixing something on Windows
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies

(From [atom](https://atom.io/docs/latest/contributing#git-commit-messages))
