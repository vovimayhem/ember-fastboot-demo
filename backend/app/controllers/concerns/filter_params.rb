# = FilterParams
# Extracts the jsonapi.org `filter` parameter and makes it available on controllers & views as the
# `filter_params` helper method. See http://jsonapi.org/format/#fetching-filtering
module FilterParams
  # Extracts filter parameters from the request parameters:
  def filter_params
    request.env['jsonapi.filter_params'] ||= params
      .fetch(:filter, ActionController::Parameters.new)
      .transform_keys(&:underscore)
      .permit!
  end
end
