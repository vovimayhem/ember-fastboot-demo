#= SerializableUser
#
# This class is responsible for converting a `User` model instance into a serialiable hash suitable
# for a JSONAPI response:
class SerializableUser < ApplicationSerializableResource
  type 'user'
  attributes :username
end
