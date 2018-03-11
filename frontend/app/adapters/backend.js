import DS from 'ember-data';
import ENV from '../config/environment';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import CachedShoe from 'ember-cached-shoe';
import { inject as service } from '@ember/service';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(CachedShoe, DataAdapterMixin, {
  fastboot: service(),

  host: computed('fastboot.isFastBoot', function() {
    const hostUrlForClient = ENV.APP.demoBackendUrl;
    const hostUrlForBackend = ENV.APP.demoBackendUrlOnBackend;

    let hostUrl = hostUrlForClient;
    if (this.get('fastboot.isFastBoot') && isPresent(hostUrlForBackend)) {
      hostUrl = hostUrlForBackend;
    }

    return hostUrl || 'http://localhost:3000';
  }),

  authorizer: 'authorizer:demo'
});
