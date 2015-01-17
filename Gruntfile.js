module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            },

            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                    style: 'compressed'
                },
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            }
        },
        clean: ["dist"],
        copy: {
            main: {
                expand: true,
                src: [
                    '**/*',
                    '!Gruntfile.js',
                    '!node_modules/**',
                    '!package.json',
                    '!README.md',
                    '!sass'
                    ],
                dest: 'dist/',
                dot: false,
                flatten: false,
                filter: 'isFile',
            },
        },
        ftp: {
            options: {
                host: 'sv02.net-housting.de',
                user: process.env.USER,
                pass: process.env.PASS
            },
            upload: {
                files: {
                    'html/nsander/': 'dist/*'
                }
            }
        },
        watch: {
            css: {
                files: 'sass/*.scss',
                tasks: ['sass:dev'],
                options: {
                    livereload: true
                },
            }
        }
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dist', [
        'sass:dist',
        'clean',
        'copy',
        'ftp'
    ]);

};