import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

// Mixing the AuthenticatedRouteMixin here will cause an endless loop between sign-in and
// auth-callback routes:
export default Route.extend(ApplicationRouteMixin);
