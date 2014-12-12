module.exports = function(grunt) {

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
        watch: {
            css: {
                files: 'sass/*.scss',
                tasks: ['sass:dev'],
                options: {
                    livereload: true,
                },
            },
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                },
            },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dist', ['sass:dist']);
};