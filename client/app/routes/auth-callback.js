import { resolve } from 'rsvp';
import Route from '@ember/routing/route';
import { isPresent, isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  fastboot: service(),

  beforeModel(transition) {
    // Since the #hash part of the URL may never make it to the server - see
    // https://github.com/ember-fastboot/ember-cli-fastboot/issues/259 - we'll let this continue on
    // the client side, by short-circuiting if we're running this code in the server, and let this
    // go all the way in the client:
    if (this.get('fastboot.isFastBoot')) { return resolve(); }

    transition.abort();
    let provider = transition.params['auth-callback'].provider;
    let [ _path, fragment ] = this.get('router.url').split('#');

    if (isEmpty(fragment)) {
      const session = this.get('session');
      if (!session.get('isAuthenticated')) { return this.replaceWith('sign-in'); }

      session.authenticate('authenticator:demo', provider);
      return session.invalidate();
    } else {
      let oauthResponse = fragment
        .split('&')
        .map(function(i) { return i.split('='); })
        .reduce(function (sum, e) { sum[e[0].camelize()] = e[1]; return sum; }, {});

      if (isPresent(oauthResponse) && isPresent(oauthResponse.accessToken)) {
        // Continue with the authentication flow, repeating the 'session.authenticate' method, this
        // time with the received oauth data.
        //
        // Since our AuthenticatedRouteMixin has set the 'ember_simple_auth-redirectTarget' cookie,
        // we'd expect the authenticator:foresight's Base to redirect theclient back to the intended
        // URL:
        return this
          .get('session')
          .authenticate('authenticator:demo', provider, { authData: oauthResponse });
      }
    }
  }
});
