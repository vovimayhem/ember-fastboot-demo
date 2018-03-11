# = Oauth::TokenInfoController
#
# Overrides Doorkeeper::ApplicationsController to further manage the actions allowed over the
# registered OAuth applications
module Oauth
  class TokenInfoController < Doorkeeper::TokenInfoController
    include JSONAPI::Rails::Controller, IncludeParams

    def show
      return render jsonapi: doorkeeper_token, include: include_params, status: :ok \
        if doorkeeper_token && doorkeeper_token.accessible?

      error = Doorkeeper::OAuth::ErrorResponse.new(name: :invalid_request)
      response.headers.merge!(error.headers)
      render jsonapi_error: error.body, status: error.status
    end

    def jsonapi_class
      super.merge :'Doorkeeper::AccessToken' => SerializableOauthAccessToken,
                  :'Doorkeeper::Application' => SerializableOauthApplication
    end
  end
end
