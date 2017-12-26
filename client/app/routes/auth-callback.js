import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { isPresent, isEmpty } from '@ember/utils';

export default Route.extend({
  session: service('session'),
  beforeModel(transition) {
    transition.abort();
    let provider = transition.params['auth-callback'].provider;
    let [ _path, fragment ] = this.get('router.url').split('#');

    console.debug('auth-callback _path:', _path);

    if (isEmpty(fragment)) {
      let session = this.get('session');
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
          .get("session")
          .authenticate("authenticator:demo", provider, { authData: oauthResponse });
      }
    }
  }
});
