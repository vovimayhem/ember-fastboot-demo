/* eslint-disable no-debugger */

// Allows mocking window.location.href on tests:
import window from 'ember-window-mock';
import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'ember-fastboot-demo/config/environment';

// The UnauthenticatedRoute mixin will redirect the user to somewhere else 
// **IF** the user is already authenticated
// - see http://ember-simple-auth.com/api/classes/UnauthenticatedRouteMixin.html
import UnauthenticatedRoute from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

// This 'sign-in' route will redirect us to the external service auth (backend
// app):
export default Route.extend(UnauthenticatedRoute, {
  router: service(),
  cookies: service(),
  fastboot: service(),

  authUrl: computed('fastboot.request.{host,protocol}', function() {
    const { demoBackendUrl, demoApiKey } = ENV.APP;
    const host = (this.get('fastboot.request.host') || window.location.host || 'localhost:4200');
    const protocol = (this.get('fastboot.request.protocol') || window.location.protocol || 'https:');
    const redirectUri = `${protocol}//${host}/auth/demo/callback`;

    const params = `response_type=token&client_id=${demoApiKey}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    return `${demoBackendUrl}/oauth/authorize?${params}`;
  }),

  beforeModel() {
    this._super(...arguments);

    // We'll store the URL before the transition (the route that displayed the
    // clicked link to 'sign-in') in a cookie, so we can redirect the user back
    // there after the external authentication flow. The redirection is
    // performed by Ember Simple Auth's ApplicationRouteMixin
    // - see https://github.com/simplabs/ember-simple-auth/blob/1.5.1/addon/mixins/application-route-mixin.js#L108
    this.storeUrlInCookie();

    if (this.fastboot.isFastBoot) {
      this.fastboot.response.headers.set('location', this.authUrl);
      this.set('fastboot.response.statusCode', 307);
    } else {
      window.location.replace(this.authUrl);
    }
  },

  storeUrlInCookie() {
    const { currentURL } = this.router;
    const { protocol } = window.location;
    const cookieOpts = { path: '/', secure: (protocol === 'https:') };
    const cookieName = 'ember_simple_auth-redirectTarget';

    return this.cookies.write(cookieName, currentURL, cookieOpts);
  }
})
