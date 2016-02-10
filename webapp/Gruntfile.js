module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    compass: {
      dist: {
        options: {
          sassDir: 'library/scss',
          cssDir: 'library/css',
          config: 'library/scss/config.rb',
          imagesDir: 'library/images'
        }
      }
    },

    watch: {
      css: {
        files: ['library/scss/*.scss','library/scss/**/*.scss'],
        tasks: ['compass'],
        options: {
          spawn: false,
          livereload: true,
        }
      },

      html: {
        files: ['*.html', '*.jsp']
      },

      scripts: {
        files: ['library/js/scripts.js']
      },

      options: {
        livereload: true,
      }
    },

    // uglify: {
    //  options: {
    //    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //  },
    //  build: {
    //    src: 'js/main.js',
    //    dest: 'build/<%= pkg.name %>.min.js'
    //  }
    //},
  });

  // Load tasks
  //grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['compass']);
};
