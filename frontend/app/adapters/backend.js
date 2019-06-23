import DS from 'ember-data';
import CachedShoe from 'ember-cached-shoe';
import ENV from 'ember-fastboot-demo/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(CachedShoe, DataAdapterMixin, {
  host: ENV.APP.demoBackendUrl,
  
  authorize(xhr) {
    let { access_token: accessToken } = this.session.data.authenticated;
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
  }
});
