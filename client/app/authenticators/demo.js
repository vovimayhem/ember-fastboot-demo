import { isEmpty } from '@ember/utils';
import { resolve, reject } from 'rsvp';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  restore(data) {
    if (isEmpty(data['accessToken']) || isEmpty(data['provider'])) { return reject(); }
    return resolve(data);
  },

  authenticate(provider, options) {
    if (isEmpty(options) || isEmpty(options.authData)) { return reject('No given auth data'); }
    const { accessToken, tokenType } = options.authData;
    return resolve({ accessToken, tokenType, provider });
  },
})
