# = ApplicationApiController
#
# Base class for controllers that respond to REST API actions
class ApplicationApiController < ActionController::API
  include ActionController::MimeResponds, AuthenticableActions, ActionErrors

  # Include jsonapi.org parameter extractors/processors:
  include FilterParams, IncludeParams, PageParams, SortParams

  protected
    # Processes received conditions hash and returns an Arel node
    def reduce_conditions_hash_to_arel_nodes(model, conditions_hash)
      conditions_hash.reduce(nil) do |conditions, keyval|
        key, value = keyval
        column = model.arel_table[key]
        values = value.split(',').flatten
        condition = case key
                    when 'tags'
                      Archon.contains(column, values)
                    else
                      column.in(values)
                    end

        conditions.present? ? conditions.and(condition) : condition
      end
    end

    def doorkeeper_unauthorized_render_options(error: nil)
      { jsonapi_errors: error }
    end

    def doorkeeper_forbidden_render_options(error: nil)
      { jsonapi_errors: 'Forbidden' }
    end
end
