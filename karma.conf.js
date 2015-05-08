module.exports = function(config) {
  'use strict';

  config.set({
    frameworks: ['jasmine'],

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ],

    files: [
      'public/components/angular/angular.js',
      'public/components/angular-mocks/angular-mocks.js',
      'public/components/angular-resource/angular-resource.js',
      'public/components/angular-route/angular-route.js',
      'public/components/angular-bootstrap/ui-bootstrap-tpls.js',
      'public/js/core.js',
      'public/js/services/*.js',
      'public/js/controllers/*.js',
      'public/js/**/*.js',
      'tests/*.spec.js'
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'public/js/**/*.js': ['coverage'],
    },

    // optionally, configure the reporter
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        {type: 'html', subdir: 'report-html'},
        {type: 'lcov', subdir: 'report-lcov'}
      ]
    },

    browsers: ['PhantomJS'],

    autoWatch: true
  });
};
