# = Oauth::AuthorizationsController
#
# Overrides Doorkeeper::ApplicationsController to further manage the actions allowed over the
# registered OAuth applications
module Oauth
  class AuthorizationsController < Doorkeeper::AuthorizationsController
    WrongAppError = Class.new(StandardError)

    rescue_from WrongAppError do |exception|
      respond_to do |format|
        format.html { render :wrong_app_error, status: :not_found }
      end
    end
  end
end
