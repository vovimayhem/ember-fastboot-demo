#= SerializableInvalidTokenResponse
#
# Extracts a Doorkeeper::AccessToken object's attributes & associations for serialization
class SerializableInvalidTokenResponse < JSONAPI::Serializable::Error
  status { '401' }
  code { @object.state }
  title { @object.name }
  detail { @object.description }
end
