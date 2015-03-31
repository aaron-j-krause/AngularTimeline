
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    jshint:{
      options:{
        jshintrc:true
      },
    files:['*.js', 'app/**/*.js', 'lib/**/*.js', 'test/**/*.js']
    },
    jscs: {
      all: {
        options: {
          config:'.jscsrc'
        },
        files: {
          src: ['*.js', 'app/**/*.js', 'lib/**/*.js', 'test/**/*.js']
        }
      }
    },
    copy:{
      build:{
        expand: true,
        cwd: 'app/',
        src: ['**/*.html', '**/*.css'],
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }

    },
    clean:{
      build:{
        src:['build/']
      }
    },
    browserify:{
      dev:{
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      }
    },
    watch:{
      files:['app/js/**/*.js', 'app/index.html'],
      tasks:['clean', 'browserify', 'copy']
    }
  });
  grunt.registerTask('default', ['jshint', 'jscs']);
  grunt.registerTask('build', ['clean', 'browserify', 'copy']);

};
