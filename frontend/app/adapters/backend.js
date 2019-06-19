import DS from 'ember-data';
import ENV from '../config/environment';
import { computed } from '@ember/object';
import CachedShoe from 'ember-cached-shoe';
import { inject as service } from '@ember/service';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(CachedShoe, DataAdapterMixin, {
  fastboot: service(),

  host: computed('fastboot.isFastBoot', function() {
    return ENV.APP.demoBackendUrl;
  }),

  authorizer: 'authorizer:demo'
});
