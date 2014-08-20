Backbone = require 'backbone'
_        = require 'underscore'

class AbstractData

	constructor : ->

		_.extend @, Backbone.Events

		return null

	__NAMESPACE__ : =>

		return window.__NAMESPACE__

module.exports = AbstractData
