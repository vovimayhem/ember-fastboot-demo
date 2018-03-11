# = IncludeParams
# Extracts & processes the jsonapi.org `include` parameter and makes it available to controllers and
# views as the `include_params` helper method. See http://jsonapi.org/format/#fetching-includes
module IncludeParams
  def include_params
    # Fetch from the request environment, or parse & save:
    request.env['jsonapi.include_params'] ||= \
      IncludeParams.normalize_params params.fetch(:include, [])
  end

  def self.normalize_params(fetched_params)
    fetched_params = fetched_params.split(',') if fetched_params.is_a? String
    fetched_params.map(&:underscore)
  end
end
