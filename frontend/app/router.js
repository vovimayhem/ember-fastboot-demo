import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sign-in');
  this.route('messages', { path: '/' });
  this.route('demo-auth-callback', { path: '/auth/demo/callback' });
  this.route('members-area');
});

export default Router;
