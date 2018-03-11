#= DeserializablePost
#
# This class is responsible for converting a `Post` model instance into a serialiable hash suitable
# for a JSONAPI response:
class SerializablePost < ApplicationSerializableResource
  type 'post'
  attributes :body, :created_at, :updated_at

  has_one :author do
    linkage always: true do
      { id: @object.author_id.to_s, type: 'user' }
    end
  end
end
