# Coffee-bone

Boilerplate for single page app built on CoffeeScript, Backbone, Sass, Grunt, amongst other things...

Although it technically works "out of the box" (*-ish*), really requires some configuration, and probably contains a lot of extra crap you don't need.

### Install

1. Clone repo
2. `$ cd [DIR NAME]`
3. `$ npm install`
4. `$ node install.js [APP NAMESPACE]` *optional - just namespaces app in all coffee files*
5. `$ grunt`

### Grunt tasks

Read through `Gruntfile.coffee` for breakdown, but general ones you'll need:
* `$ grunt` - pre-deploy build
* `$ grunt w` - dev build: compile sass / coffee, watch for changes, start local server
* `$ grunt w:cs` / `$ grunt w:sass` - dev builds: compile coffee / sass resptively and keep watching. Nice to keep these separate sometimes in interest of efficiency - no point recompiling sass when coffee has changed

### General FE app structure notes

* `Router.coffee` - capture / modify URL hashChange events
* `Nav.coffee` - list all available site routes, handle / delegate URL hashChange events
* `AppView.coffee` - Core view, all UI bound here. Anything with a deeplink in `Wrapper`, any modal-only content in `ModalManager`
* `Wrapper.coffee`
	* mapping for all site deeplinked views
	* each view may be an `AbstractViewPage` or `AbstractViewModal`
	* handle management of deeplinked pages / modals based on view 'type' and history state
	* trigger sub-route event changing

### Important FE utils / data management

* `API.coffee` - use to retrieve all endpoints
* `UserData.coffee` - holds all user data, convenience methods to integrate with assumed user API endpoints (login / logout etc)
* `Templates.coffee` - all application HTML is loaded via single XML file, this templates wrapper allows getter based on ID
* `Locale.coffee` - all localised copy is expected in JSON file format, based on predefined (or detected) ISO-compatible locale code. This class offers wrapper to get localised string based on unique ID.
* `Analytics.coffee` - Google Analytics custom event firing, requires custom JSON containing ID / event string mappings.

### Included JS libs

* Backbone (+ jQuery + Underscore)
* Backbone DeepModel
* Require.js
* TweenLite.js (+ CSSPlugin + EasePack)

### Included SDKs

* Facebook
* Google+
