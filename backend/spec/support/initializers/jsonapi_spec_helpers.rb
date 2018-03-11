require 'jsonapi_spec_helpers'

RSpec.configure do |config|
  config.include JsonapiSpecHelpers
end

module JsonapiSpecHelpers
  # class Payload
  #   def key(name, *args, &blk)
  #     options = args.last.is_a?(Hash) ? args.pop : {}
  #     options[:type] = args.first
  #     options[:allow_nil] ||= false
  #     @no_keys.reject! { |k| k == name }
  #     prc = blk
  #     prc = ->(record) { record.send(name) } if prc.nil?
  #     @keys[member_name_for(name, options)] = options.merge(proc: prc)
  #   end
  #
  #   def timestamps!
  #     @keys[member_name_for(:created_at)] = key(:created_at, String)
  #     @keys[member_name_for(:updated_at)] = key(:updated_at, String)
  #   end
  #
  #   def member_name_style(style = :underscore)
  #     @member_name_style = style
  #   end
  #
  #   private
  #
  #   def member_name_for(name, options = {})
  #     transform_method = options.fetch :member_name_style, (@member_name_style || :underscore)
  #     transform_method = :dasherize if transform_method == :hyphen
  #     name.to_s.send transform_method
  #   end
  # end

  module Helpers
    def validation_errors
      @validation_errors ||= {}.tap do |errors|
        return errors if json['errors'].nil?
        json['errors'].each do |e|
          pointer = e.dig('source', 'pointer')
          next if pointer.nil? || pointer == ''
          attr = pointer.gsub('/data/attributes/', '').to_sym
          message = e['detail']

          if errors[attr]
            errors[attr] = Array(errors[attr]).push(message)
          else
            errors[attr] = message
          end
        end
      end
    end
  end
end
