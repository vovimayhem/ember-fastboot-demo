import { assert } from '@ember/debug';
import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import ENV from '../config/environment';

export default Mixin.create({
  session: service('session'),
  cookies: service('cookies'),
  // authorization: service('authorization'),

  authenticationRoute: computed(function() { return ENV['ember-simple-auth'].authenticationRoute; }),

  beforeModel(transition) {
    const authenticationRoute = this.get('authenticationRoute'),
          currentRouteName = this.get('routeName'),
          attemptedUrl = transition.intent.url;

    if (!this.get('session.isAuthenticated')) {
      assert('The route configured as authenticationRoute cannot implement the AuthenticatedRouteMixin mixin as that leads to an infinite transitioning loop!', currentRouteName !== authenticationRoute);

      transition.abort();

      // Normally SimpleAuth will save the aborted transition directly on the 'session' object, to
      // retry it later...
      // ...however, our current Hawkeye authentication flow (using Directory Services) involves
      // navigating out of the site, which causes anything stored outside of 'session.data' to get
      // lost... and we can't store the aborted transition there, as the browser will complain about
      // circular references...
      // So we'll store the attempted transition's URL, so we can go there after out external flow:
      let cOpts = { path: '/' }
      this.get('cookies').write('ember_simple_auth-redirectTarget', attemptedUrl, cOpts);
      this.get('session').authenticate('authenticator:demo', 'demo');
    } else {
      return this._super(...arguments);
    }
  }
});
