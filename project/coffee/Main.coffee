#import models/AbstractModel.coffee
#import models.*
#import collections/AbstractCollection.coffee
#import collections.*
#import data/AbstractData.coffee
#import data.*
#import AppData.coffee
#import utils.*
#import view/AbstractView.coffee
#import view.*
#import router.*
#import AppView.coffee
#import App.coffee

# PRODUCTION ENVIRONMENT - may want to use server-set variables here
IS_LIVE = do -> return if window.location.host.indexOf('localhost') > -1 or window.location.search is '?d' then false else true

# ONLY EXPOSE APP GLOBALLY IF LOCAL OR DEV'ING
view = if IS_LIVE then {} else (window or document)

# DECLARE MAIN APPLICATION
view.__NAMESPACE__ = new App IS_LIVE
view.__NAMESPACE__.init()
