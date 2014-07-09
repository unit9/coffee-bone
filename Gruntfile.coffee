module.exports = (grunt) ->

    "use strict"

    pkg = grunt.file.readJSON("package.json")

    # Project configuration
    grunt.initConfig
        pkg: pkg

        # Set the path for all folders
        paths:

            source:
                coffee  : pkg.folders.src + "/coffee"
                css     : pkg.folders.src + "/sass"
                toMerge : pkg.folders.bin + "/js/vendor/merged"
                r       : pkg.folders.bin + "/js/r.js"
                cms_r   : pkg.folders.bin + "/cms/js/r.js"
                js      : pkg.folders.bin + "/js/main.js"
                xml     : pkg.folders.bin + "/data/templates.xml"
                svg     : pkg.folders.src + "/svg/ss-icons"

            release:
                r     : pkg.folders.bin + "/js/r.min.js"
                js    : pkg.folders.bin + "/js/main.js"
                css   : pkg.folders.bin + "/css/main.css"
                v     : pkg.folders.bin + "/js/vendor/v.js"
                vmin  : pkg.folders.bin + "/js/vendor/v.min.js"
                bin   : pkg.folders.bin
                xml   : pkg.folders.bin + "/data/templates.min.xml"
                svg   : pkg.folders.src + "/svg/compiled"

            map:
                build     : pkg.folders.bin + "/js/main.map"
                build_url : "/js/main.map"
                v         : pkg.folders.bin + "/js/vendor/v.map"
                v_url     : "/js/vendor/v.map"
                r         : pkg.folders.bin + "/js/r.map"
                r_url     : "/js/r.map"


        # uglify
        uglify: 
            coffee: 
                files: 
                    '<%= paths.release.js %>': ['<%= paths.source.js %>']

            require: 
                files: 
                    '<%= paths.release.r %>': ['<%= paths.source.r %>']

            vendors:
                files: 
                    '<%= paths.release.vmin %>': ['<%= paths.release.v %>']

        # concatenate vendor JS
        concat: 
            options: 
                banner: '/*! <%= pkg.name %> | <%= pkg.author %> - VENDORS - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
                separator : '\n\n'
            vendors: 
                src: ["<%= paths.source.toMerge %>/core/*.js", "<%= paths.source.toMerge %>/**/*.js"]
                dest: '<%= paths.release.v %>'

        # sass compilation
        sass: 
            dist: 
                files :
                  '<%=paths.release.css%>' : "<%=paths.source.css%>/main.scss"

        # Watch for changes
        watch:
            main: 
                files : ["<%= paths.source.coffee %>/**/*.coffee", "<%= paths.source.css %>/**/*.scss", "<%= paths.release.bin %>*.html", "<%= paths.source.r %>", "<%= paths.release.bin %>*.xml"]
                tasks : ['percolator:main', 'sass:dist', "autoprefixer:build", "xmlmin"]
                options : 
                    livereload: true

            cs: 
                files : ["<%= paths.source.coffee %>/**/*.coffee"]
                tasks : ['percolator:main']
                options : 
                    livereload: false

            sass: 
                files : ["<%= paths.source.css %>/**/*.scss"]
                tasks : ['sass:dist', "autoprefixer:build"]
                options : 
                    livereload: true


        # Compile CoffeeScript using Percolator
        percolator: 
            main:
                source  : '<%= paths.source.coffee %>'
                output  : '<%= paths.source.js %>'
                main    : 'Main.coffee'
                compile : false
                opts    : ""

        # Modernizr custom build (based on css classes / js obj references)
        # NOTE - grunt-modernizr doesn't currently support multiple output targets, so toggle
        # the commented lines here to switch between running for main site build and fallback site
        modernizr :
            devFile    : pkg.folders.bin + "/js/vendor/modernizr-dev.js"
            outputFile : pkg.folders.bin + "/js/vendor/modernizr-custom.js"

            extra :
                shiv       : true
                printshiv  : false
                load       : true
                mq         : false
                cssclasses : true

            extensibility :
                addtest      : false
                prefixed     : false
                teststyles   : false
                testprops    : false
                testallprops : false
                hasevents    : false
                prefixes     : false
                domprefixes  : false

            parseFiles : true

            files : ['<%= paths.release.bin %>/js/**/*.js', '<%= paths.release.bin %>/css/**/*.css']

        # css prefixes
        autoprefixer:
            build:
                options:
                    browsers: ["ie >= 8", "ff >= 3", "safari >= 4", "opera >= 12", "chrome >= 4" ]
                files:
                    "<%= paths.release.css %>": "<%= paths.release.css %>"

        # because autoprefixer doesnt minify
        cssmin:
            main:
                files:
                    "<%= paths.release.css %>": "<%= paths.release.css %>"

        # minify xml
        xmlmin:
            main:
                options:
                    preserveComments: false
                files:
                    "<%= paths.release.xml %>": "<%= paths.source.xml %>"

        # spritesheet generation
        iconizr :
            desktop :
                src    : "<%= paths.source.svg %>"
                dest   : "<%= paths.release.svg %>"
                sass   : true
                prefix : "ss"

        # run arbitrary shell commands
        shell : 
            cleanIcons :
                command : 'cd ' + pkg.folders.src + '/svg && node clean-icons.js'

        # combine media queries
        cmq :
            options :
                log : false
            your_target :
                files :
                    '<%= paths.release.css %>' : '<%= paths.release.css %>'

        # remove console.log()s before production
        removelogging :
            dist :
                src  : "<%= paths.source.js %>"
                dest : "<%= paths.source.js %>"

        # simple httpserver
        connect :
            server :
                options :
                    port      : 1111
                    base      : "<%= paths.release.bin %>"
            keepalive :
                options :
                    port      : 1111
                    keepalive : true
                    open      : true
                    base      : "<%= paths.release.bin %>"

    # Load tasks
    list = pkg.devDependencies
    grunt.loadNpmTasks k for k, v of list

    # Register tasks.
    grunt.registerTask "default", ["percolator:main", "removelogging", "sass:dist", "autoprefixer:build", "cmq", "cssmin:main", "concat:vendors", "uglify:require", "uglify:vendors", "uglify:coffee", "modernizr:main", "xmlmin:main"]
    grunt.registerTask "w", ["connect:server", "percolator:main", "sass:dist", "autoprefixer:build", "xmlmin:main", "watch:main"]
    grunt.registerTask "w:cs", ["connect:server", "percolator:main", "watch:cs"]
    grunt.registerTask "w:sass", ["sass:dist", "autoprefixer:build", "watch:sass"]
    grunt.registerTask "v", ["concat:vendors"]
    grunt.registerTask "vmin", ["concat:vendors", "uglify:vendors"]
    grunt.registerTask "icons", ["iconizr", "shell:cleanIcons"]
