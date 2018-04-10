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
      // Here you can pass flags/options to your application instance
      // when it is created
      demoApiKey: '3c8466708b1438f03825764d1efa0077b830667bb6fa17ff75104c1a6b8fb528',
      demoBackendUrl: (process.env.DEMO_BACKEND_URL || 'http://localhost:3000'),

      // Used to query the backend from the FastBoot process whenever the access to the backend
      // RESTAPI is available on an alternate URL (i.e. different secured network)
      demoBackendUrlOnBackend: process.env.DEMO_BACKEND_URL_ON_BACKEND,

      // OAuth URL:
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
    },

    'ember-cli-mirage' : {
      enabled: false
    },
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
    ENV.APP.autoboot = false;

    ENV.APP.demoBackendUrl = 'http://backend.example.com';
    ENV.APP.demoBackendUrlOnBackend = 'http://backend.example.com';
    ENV.APP.demoOAuthUrl = 'http://backend.example.com/oauth';

    ENV['ember-cli-mirage'].enabled = true;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
