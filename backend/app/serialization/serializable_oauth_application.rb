#= SerializableOauthApplication
#
# Extracts a Doorkeeper::Application object's attributes & associations for serialization
class SerializableOauthApplication < ApplicationSerializableResource
  type 'oauth-application'
  attributes :name, :uid
end
