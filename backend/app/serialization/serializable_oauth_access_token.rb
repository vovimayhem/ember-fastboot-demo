#= SerializableOauthAccessToken
#
# Extracts a Doorkeeper::AccessToken object's attributes & associations for serialization
class SerializableOauthAccessToken < ApplicationSerializableResource
  type 'oauth-access-token'

  id { @object.token }

  attributes :scopes, :expires_in_seconds

  attribute(:created_at) { @object.created_at }

  has_one :application do
    linkage always: true do
      { id: @object.application_id, type: 'oauth-application' }
    end
  end

  has_one :resource_owner do
    linkage always: true do
      next unless @object.resource_owner_id.present?
      { id: @object.resource_owner_id, type: 'user' }
    end
  end
end
