import { reject, resolve } from 'rsvp';
import { isPresent } from '@ember/utils';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from '../config/environment';

function validateData(data) {
  return isPresent(data['accessToken']) && isPresent(data['provider']);
}

export default Base.extend({
  restore(data) {
    return validateData(data) ? resolve(data) : reject();
  },

  authenticate(provider, options) {
    const { protocol, host } = window.location,
          { demoOAuthUrl, demoApiKey } = ENV.APP,
          redirectUri = `${protocol}//${host}/auth/demo/callback`;

    if (isPresent(options) && isPresent(options.authData)) {
      const { accessToken, tokenType } = options.authData;
      return resolve({ accessToken, tokenType, provider: 'demo' });
    } else {
      let params = `response_type=token&client_id=${demoApiKey}&redirect_uri=${encodeURIComponent(redirectUri)}`;
      let nextLocation = `${demoOAuthUrl}/authorize?${params}`;
      window.location.replace(nextLocation);
      return reject();
    }
  },
})
