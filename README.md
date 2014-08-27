# Coffee-bone

Boilerplate for single page app built on CoffeeScript, Backbone, Sass, Gulp, Browserify, amongst other things...

Although it technically works "out of the box" (*-ish*), really requires some configuration, and probably contains a lot of extra crap you don't need.

### Install

1. Clone repo into `[DIR NAME]`
2. `$ cd [DIR NAME]`
3. `$ npm install`
4. `$ node install.js [APP NAMESPACE]` *optional - just namespaces app in all coffee files*
5. `$ gulp`

### Gulp tasks

* `$ gulp` - *development mode*
	* Watchify (browserify)
	* Compile Sass
	* Autoprefix CSS
	* Minify XML templates
	* Optimise images
	* BrowserSync (local server)
	* + watch for changes in `.coffee`, `.scss`, `templates.xml` and images, trigger repeat

* `$ gulp build` - *pre-deploy build*
	* Browserify
	* Remove `console.log`s
	* Compile Sass
	* Autoprefix CSS
	* Combine media queries
	* Minify CSS
	* Minify XML templates
	* Concatenate vendor JS
	* Uglify JS (vendor + main application JS)
	* Custom modernizr build based on refs used through app *-- TO DO*
	* Iconizr *-- TO DO*

* Others:
	* *Check `/gulp/tasks` - each file corresponds to an individual gulp task*

### General FE app structure notes

* `Router.coffee` - capture / modify URL hashChange events
* `Nav.coffee` - list all available site routes, handle / delegate URL hashChange events
* `AppView.coffee` - Core view, all UI bound here. Anything with a deeplink in `Wrapper`, any modal-only content in `ModalManager`
* `Wrapper.coffee`
	* mapping for all site deeplinked views
	* each view may be an `AbstractViewPage` or `AbstractViewModal`
	* handle management of deeplinked pages / modals based on view 'type' and history state
	* trigger sub-route event changing
* `AbstractViewPage` / `AbstractViewModal` - URL based pages, built in methods for page transitions
* `_ModalManager.coffee` - custom modal management (non URL-based popups)

### Important FE utils / data management

* `API.coffee` - use to retrieve all endpoints
* `UserData.coffee` - holds all user data, convenience methods to integrate with assumed user API endpoints (login / logout etc)
* `Templates.coffee` - all application HTML is loaded via single XML file, this templates wrapper allows getter based on ID
* `Locale.coffee` - all localised copy is expected in JSON file format, based on predefined (or detected) ISO-compatible locale code. This class offers wrapper to get localised string based on unique ID.
* `Analytics.coffee` - Google Analytics custom event firing, requires custom JSON containing ID / event string mappings.
* `Share.coffee` - Wrapper for sharing to various social networks in popup windows (except FB, this should be done via `Facebook.coffee` class)
* Others - just look around :)

### Included SDKs

These come packaged in wrapper classes that load the SDKs asynchronously and have some helper methods for API interaction
* Facebook (`Facebook.coffee`)
* Google+ (`GooglePlus.coffee`)

### Included JS libs

* Backbone (+ jQuery + Underscore + Backbone DeepModel)
* TweenLite.js (+ CSSPlugin + EasePack)

### Sass

* Normalise
* Custom easing
* Various helpers + mixins
