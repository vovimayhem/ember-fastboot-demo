import Route from '@ember/routing/route';
import OAuth2ImplicitGrantCallbackRouteMixin from 'ember-simple-auth/mixins/oauth2-implicit-grant-callback-route-mixin';

// The route placed on `/auth/demo/callback`, catches the client being
// redirected from the backend's Implicit Grant Authentication Flow:
export default Route.extend(OAuth2ImplicitGrantCallbackRouteMixin, {
  authenticator: 'authenticator:demo'
});
