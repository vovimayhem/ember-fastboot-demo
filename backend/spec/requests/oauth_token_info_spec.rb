require 'rails_helper'
require_relative 'request_authorization'

RSpec.describe 'OauthTokenInfo', type: :request do
  include Docs::OauthTokens::Api

  describe 'GET /oauth/token/info' do
    include Docs::OauthTokens::Info
    include_context 'of an authorized JSONAPI.org request'

    it 'serves the token information', :dox do
      get oauth_token_info_path, headers: test_request_headers
      expect(response).to have_http_status :ok
      assert_payload :oauth_access_token, test_request_token, json_item
    end
  end
end
