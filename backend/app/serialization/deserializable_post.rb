#= DeserializablePost
#
# This class is responsible for converting an incoming JSONAPI representation of a `Post` object
# into an `ActionController::Parameters` object that can be used to create or update `Post`
# records.
class DeserializablePost < JSONAPI::Deserializable::Resource
  attributes :body
end
