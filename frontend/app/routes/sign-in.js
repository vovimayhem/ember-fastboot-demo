// Allows mocking window.location.href on tests:
import window from 'ember-window-mock';
import Route from '@ember/routing/route';
import { computed } from '@ember/object';
import ENV from 'demo/config/environment';
import { inject as service } from '@ember/service';

// The UnauthenticatedRoute mixin will redirect the user to somewhere else **IF** the user is
// already authenticated - see http://ember-simple-auth.com/api/classes/UnauthenticatedRouteMixin.html
import UnauthenticatedRoute from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

// This 'sign-in' route will redirect us to the external service auth (backend app):
export default Route.extend(UnauthenticatedRoute, {
  cookies: service(),
  fastboot: service(),

  authUrl: computed('fastboot.request.{host,protocol}', function() {
    const { demoOAuthUrl, demoApiKey } = ENV.APP;
    const host = (this.get('fastboot.request.host') || window.location.host || 'localhost:4200');
    const protocol = (this.get('fastboot.request.protocol') || window.location.protocol || 'https:');
    const redirectUri = `${protocol}//${host}/auth/demo/callback`;

    const params = `response_type=token&client_id=${demoApiKey}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    return `${demoOAuthUrl}/authorize?${params}`;
  }),

  beforeModel() {
    this._super(...arguments);

    // We'll store the URL before the transition (the route that displayed the clicked link to
    // 'sign-in') in a cookie, so we can redirect the user back there after the external
    // authentication flow. The redirection is performed by Ember Simple Auth's ApplicationRouteMixin
    // - see https://github.com/simplabs/ember-simple-auth/blob/1.5.1/addon/mixins/application-route-mixin.js#L108
    this.storeUrlInCookie();

    const authUrl = this.get('authUrl');

    if (this.get('fastboot.isFastBoot')) {
      this.get('fastboot.response.headers').set('location', authUrl);
      this.set('fastboot.response.statusCode', 307);
    } else {
      window.location.replace(authUrl);
    }
  },

  storeUrlInCookie() {
    const previousURL = this.get('router.url');
    const protocol = this.get('router.location.location.protocol');
    const cookieOpts = { path: '/', secure: (protocol === 'https:') };
    return this.get('cookies').write('ember_simple_auth-redirectTarget', previousURL, cookieOpts);
  }
})
