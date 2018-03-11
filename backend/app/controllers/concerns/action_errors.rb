module ActionErrors
  extend ActiveSupport::Concern

  # ActionErrors::Forbidden
  #
  # Describes the error case when the client calls an action something out of their authorized scope
  Forbidden = Class.new(StandardError)

  included do
    rescue_from Forbidden do
      respond_with_error :forbidden
    end

    rescue_from ActiveRecord::RecordNotFound do
      respond_with_error :not_found
    end
  end

  protected

    def respond_with_error(error_status)
      respond_to do |format|
        format.html { render text: error_status.to_s.humanize, status: error_status }
        format.any { head error_status }
      end
    end
end
