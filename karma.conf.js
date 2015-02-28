module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher'
    ],

    files: [
      'tests/*.spec.js'
    ],

    reporters: ['progress', 'coverage'],

    browsers: ['PhantomJS'],

    autoWatch: true
  });
};
