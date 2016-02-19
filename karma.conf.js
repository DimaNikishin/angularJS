module.exports = function(config){
  config.set({

    basePath : './',
//TODO: delete unnecessary files
    files : [
      'app/bower_components/jquery/dist/jquery.min.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/greensock/src/uncompressed/TweenMax.js',
      'app/bower_components/angular-loader/angular-loader.js',
      'app/components/**/*.js',
      'app/index/**/*.module.js',
      'app/index/**/*.controller.js',
      'app/view*/**/*.module.js',
      'app/view*/**/*.controller.js',
      'app/view*/**/*.js',
      'app/tests/**/*.js',
      'app/*.js',
      'app/view4/ProductTemplate/*.html',
      'app/authentication/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    preprocessors: {
      'app/view4/ProductTemplate/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor : {
      stripPrefix: 'app/'
    }
});
};
