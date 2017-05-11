// Karma configuration
// Generated on 2017-04-20

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    preprocessors: {
        'app/**/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
        stripPrefix: 'app/',
        moduleName: 'dir-templates'
    },

    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/jqlite/jqlite.js',
      'bower_components/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js',
      'bower_components/angular/angular.js',
      'bower_components/**/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-location-update/angular-location-update.js',
      'bower_components/angular-file-model/angular-file-model.js',
      'bower_components/semantic/dist/semantic.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-validation-match/dist/angular-validation-match.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/ngMask/dist/ngMask.js',
      'bower_components/moment/moment.js',
      'app/**/*.html',
      'app/scripts/app.js',
      'app/configs/test.js',
      'app/scripts/**/*.js',
      'app/components/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
        'karma-jasmine',
        'karma-ng-html2js-preprocessor',
        'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-junit-reporter'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
