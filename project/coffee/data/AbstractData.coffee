class AbstractData

	constructor : ->

		_.extend @, Backbone.Events

		return null

	__NAMESPACE__ : =>

        return view.__NAMESPACE__