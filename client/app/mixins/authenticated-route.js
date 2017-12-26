import { assert } from '@ember/debug';
import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Mixin.create({
  session: service(),
  cookies: service(),
  fastboot: service(),

  authenticationRoute: 'sign-in',

  requestProtocol: computed('fastboot.request.protocol', function() {
    return this.get('fastboot.request.protocol') || window.location.protocol;
  }),

  beforeModel(transition) {
    if (!this.get('session.isAuthenticated')) {
      // Normally SimpleAuth would save the aborted transition directly on the 'session' object, for
      // the browser to retry it later...

      // ...however, our current Hawkeye authentication flow (using Directory Services) involves
      // navigating out of the site, which causes anything stored outside of 'session.data' to get
      // lost... and we can't store the aborted transition there, as the browser will complain about
      // circular references...

      // So we'll store the attempted transition's URL in the cookies, just as it happens with
      // fastboot, and go to the external flow:
      const attemptedUrl = transition.intent.url;
      let cOpts = { path: '/', secure: (this.get('requestProtocol') === 'https:') };

      this.get('cookies').write('ember_simple_auth-redirectTarget', attemptedUrl, cOpts);
      return this.triggerAuthentication();
    } else {
      return this._super(...arguments);
    }
  },

  triggerAuthentication() {
    const currentRouteName = this.get('routeName'),
          authenticationRoute = this.get('authenticationRoute');
    assert('The route configured as authenticationRoute cannot implement the AuthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', currentRouteName !== authenticationRoute);
    this.transitionTo(authenticationRoute);
  },
});
