import Route from '@ember/routing/route';

// We'll add the Ember Simple Auth's ApplicationRouteMixin so we can detect when
// the user has just been authenticated, and transition to the previous route in
// the auth-callback:
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin);
