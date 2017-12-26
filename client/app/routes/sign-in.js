import Route from '@ember/routing/route';
import ENV from '../config/environment';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Route.extend({
  fastboot: service(),

  redirectUri: computed('fastboot.request.host', 'fastboot.request.protocol', function() {
    const host = (this.get('fastboot.request.host') || window.location.host || 'localhost:4200'),
          protocol = (this.get('fastboot.request.protocol') || window.location.protocol || 'https:');
    return `${protocol}//${host}/auth/demo/callback`;
  }),

  beforeModel() {
    const redirectUri = this.get('redirectUri'),
          { demoOAuthUrl, demoApiKey } = ENV.APP;

    const params = `response_type=token&client_id=${demoApiKey}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    const loginLocation = `${demoOAuthUrl}/authorize?${params}`;

    if (this.get('fastboot.isFastBoot')) {
      this.get('fastboot.response.headers').set('location', loginLocation);
      this.set('fastboot.response.statusCode', 307);
    } else {
      window.location.replace(loginLocation);
    }
  }
});
