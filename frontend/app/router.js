import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('messages', { path: '/' });
  this.route('members-area');
  this.route('sign-in');
  this.route('auth-callback', { path: '/auth/demo/callback' });
});

export default Router;
