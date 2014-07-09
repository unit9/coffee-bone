var paths = {
    "async": 'js/vendor/async',
    "plugins": 'js/plugins.min'
};

var libs = [];
for (var n in paths) libs.push(n);

window.initAnalytics = function() {
    ga('create', window.config.GA_code);
    ga('require', 'displayfeatures');
    ga('send', 'pageview');
};

requirejs.config({
    baseUrl: '/',
    waitSeconds: 120,
    paths: paths,

    shim: {
        'ga': {
            export: "ga"
        },
        "plugins": ['async']
    },
    map: {}
});

require(libs, function() {

    require(['/js/vendor/v.min.js'], function() {

        require(['/js/main.js'], function() {

            require(['//www.google-analytics.com/analytics.js'], window.initAnalytics);

        });

    });

});
