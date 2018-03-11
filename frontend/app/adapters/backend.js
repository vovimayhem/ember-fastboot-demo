import DS from 'ember-data';
import ENV from '../config/environment';
import CachedShoe from 'ember-cached-shoe';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(CachedShoe, DataAdapterMixin, {
  host: ENV.APP.demoBackendUrl,
  authorizer: 'authorizer:demo'
});
