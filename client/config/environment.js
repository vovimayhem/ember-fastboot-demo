/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'demo',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance when it is created
      demoApiKey: (process.env.DEMO_API_KEY || 'cb6469c69024696907215d7f3bedcc7880a5de16833945639d81b48b8d98a098'),
      demoOAuthUrl: (process.env.DEMO_OAUTH_URL || 'http://localhost:3000/oauth'),
    },

    'ember-simple-auth' : {
      baseURL:                     '',
      authenticationRoute:         'sign-in',
      routeAfterAuthentication:    'home',
      routeIfAlreadyAuthenticated: 'home'
    },

    fastboot: {
      hostWhitelist: ['example.com', 'subdomain.example.com', /^localhost:\d+$/]
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
