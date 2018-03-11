#= ApplicationSerializableResource
# Base class for all application resources
class ApplicationSerializableResource < JSONAPI::Serializable::Resource
  extend JSONAPI::Serializable::Resource::KeyFormat
  key_format -> (key) { key.to_s.dasherize }
end
