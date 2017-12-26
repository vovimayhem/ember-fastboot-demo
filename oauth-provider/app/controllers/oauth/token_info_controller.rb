# = Oauth::TokenInfoController
#
# Overrides Doorkeeper::ApplicationsController to further manage the actions allowed over the
# registered OAuth applications
module Oauth
  class TokenInfoController < Doorkeeper::TokenInfoController
    def show
      if doorkeeper_token && doorkeeper_token.accessible?
        render json: serializable_resource, status: :ok
      else
        error = Doorkeeper::OAuth::ErrorResponse.new(name: :invalid_request)
        response.headers.merge!(error.headers)
        render json: error.body, status: error.status
      end
    end

    private

    def serialization_opts
      {
        serializer: Doorkeeper::AccessTokenSerializer,
        adapter: :json_api,
        include: 'application,user'
      }
    end

    def serializable_resource
      ActiveModelSerializers::SerializableResource.new doorkeeper_token, serialization_opts
    end
  end
end
