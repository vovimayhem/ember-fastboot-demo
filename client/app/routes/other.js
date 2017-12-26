import { resolve } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from '../mixins/authenticated-route';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  model() {
    return resolve(this.get('session.data.authenticated'));
  }
});
