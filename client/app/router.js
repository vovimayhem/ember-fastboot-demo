import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('auth-callback', { path: '/auth/:provider/callback' });
  this.route('home', { path: '/' });
  this.route('sign-in');
  this.route('other');
});

export default Router;
