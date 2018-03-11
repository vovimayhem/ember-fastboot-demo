# = SortParams
# Helpers that deal with the jsonapi.org `sort` parameter and makes it available on controllers &
# views. See http://jsonapi.org/format/#fetching-sorting
module SortParams
  # Extracts and sanitizes the jsonapi.org `sort` parameter
  def sort_params
    request.env['jsonapi.sort_params'] ||= SortParams.normalize_params params.fetch(:sort, '')
  end

  def self.normalize_params(fetched_params)
    fetched_params.split(',').each_with_object(ActionController::Parameters.new) do |field, hash|
      # Sanitize the param name - leave only "word characters" (letter, number, underscore), dashes
      # and dots:
      field.gsub!(/[^\.\w-]/, '')

      # Set the default direction:
      direction = :asc

      # If the field starts with a 'minus' sign, the direction is descending - we'll also take out
      # the minus sign from the field name. Note that we use () && () to make multiple assignments
      # within the inline 'if':
      (direction = :desc) && (field = field[1..-1]) if field.starts_with? '-'

      # Add the field and direction to the cumulative hash:
      hash[field.underscore] = direction
    end.permit!
  end
end
