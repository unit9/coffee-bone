class AppView extends AbstractView

	template : 'main'

	$window  : null
	$body    : null

	wrapper  : null
	footer   : null

	dims :
		w : null
		h : null
		o : null
		c : null

	events :
		'click a' : 'linkManager'

	EVENT_UPDATE_DIMENSIONS : 'EVENT_UPDATE_DIMENSIONS'

	MOBILE_WIDTH : 700
	MOBILE       : 'mobile'
	NON_MOBILE   : 'non_mobile'

	constructor : ->

		@$window = $(window)
		@$body   = $('body').eq(0)

		super()

		return null

	disableTouch: =>

		@$window.on 'touchmove', @onTouchMove

		null

	enableTouch: =>

		@$window.off 'touchmove', @onTouchMove

		null

	onTouchMove: ( e ) ->

		e.preventDefault()

		null

	render : =>

		@bindEvents()

		@preloader    = new Preloader
		@modalManager = new ModalManager

		@header  = new Header
		@wrapper = new Wrapper
		@footer  = new Footer

		@
			.addChild @header
			.addChild @wrapper
			.addChild @footer

		@onAllRendered()

		null

	bindEvents : =>

		@on 'allRendered', @onAllRendered

		@onResize()

		@onResize = _.debounce @onResize, 300
		@$window.on 'resize orientationchange', @onResize

		null

	onAllRendered : =>

		# console.log "onAllRendered : =>"

		@$body.prepend @$el

		@begin()

		null

	begin : =>

		@trigger 'start'

		@__NAMESPACE__().router.start()

		@preloader.hide()

		null

	onResize : =>

		@getDims()

		null

	getDims : =>

		w = window.innerWidth or document.documentElement.clientWidth or document.body.clientWidth
		h = window.innerHeight or document.documentElement.clientHeight or document.body.clientHeight

		@dims =
			w : w
			h : h
			o : if h > w then 'portrait' else 'landscape'
			c : if w <= @MOBILE_WIDTH then @MOBILE else @NON_MOBILE

		@trigger @EVENT_UPDATE_DIMENSIONS, @dims

		null

	linkManager : (e) =>

		href = $(e.currentTarget).attr('href')

		return false unless href

		@navigateToUrl href, e

		null

	navigateToUrl : ( href, e = null ) =>

		route   = if href.match(@__NAMESPACE__().BASE_PATH) then href.split(@__NAMESPACE__().BASE_PATH)[1] else href
		section = if route.indexOf('/') is 0 then route.split('/')[1] else route

		if @__NAMESPACE__().nav.getSection section
			e?.preventDefault()
			@__NAMESPACE__().router.navigateTo route
		else 
			@handleExternalLink href

		null

	handleExternalLink : (data) => 

		###

		bind tracking events if necessary

		###

		null
