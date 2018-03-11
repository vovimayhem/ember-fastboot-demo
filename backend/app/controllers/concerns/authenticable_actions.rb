# = AuthenticableAction
#
# Module that coordinates authentication flows from Devise and Doorkeeper, and resolves the current
# user from the active authentication strategy
module AuthenticableActions
  extend ActiveSupport::Concern

  included do
    include Doorkeeper::Rails::Helpers
  end

  # We're using this instead of :doorkeeper_authorize!, so when we need to add some custom logic for
  # it, we'll do it here:
  def authorize_client!(*scopes)
    @_doorkeeper_scopes = scopes.presence || Doorkeeper.configuration.default_scopes
    doorkeeper_render_error unless valid_doorkeeper_token?
  end

  # :nodoc:
  # Reek complains about multiple calls to `request.env` and/or not refering to object state...
  define_method(:auth_request_env) { request.env }

  # Determines the request's user by:
  #  1. Checking if there is a valid OAuth Token from a valid resource owner
  #  2. Checking the Devise Session Data (Clients visiting us on a web flow)
  def current_user
    # Short circuit if the env initialization has run before:
    return auth_request_env['auth_current_user'] if auth_request_env['auth_current_user_setup']
    auth_request_env['auth_current_user_setup'] = true

    return auth_request_env['auth_current_user'] = doorkeeper_token.resource_owner \
      if valid_doorkeeper_resource_owner_token?

    auth_request_env['auth_current_user'] = warden.authenticate(scope: :user)
  end

  def current_user_scope
    return User.none unless valid_doorkeeper_resource_owner_token?
    User.where(id: doorkeeper_token.resource_owner_id)
  end

  def valid_doorkeeper_resource_owner_token?
    valid_doorkeeper_token? && doorkeeper_token.resource_owner_id
  end
end
