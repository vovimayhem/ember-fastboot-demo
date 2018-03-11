require 'rails_helper'
require_relative 'jsonapi_request'

RSpec.shared_context 'of an authorized JSONAPI.org request' do
  include_context 'of an JSONAPI.org request'

  # The user that was granted an access:
  let(:test_request_resource_owner) { create :user }

  let(:test_request_token_scopes) { [] }

  # Tokens in the authentication flow won't have a referenced application
  let(:test_request_token_application) { nil }

  let! :test_request_token do
    access_token = create :oauth_access_token,
                          resource_owner_id: test_request_resource_owner&.id,
                          application_id: test_request_token_application&.id,
                          scopes: test_request_token_scopes
    access_token.update! token: 'YOUR_ACCESS_TOKEN'
    access_token
  end

  # By default, the request headers will be an authorized JSONAPI request headers - override on
  # tests that require unauthorized cases:
  let :test_request_headers do
    jsonapi_request_headers.merge 'Authorization' => "Bearer #{test_request_token.token}"
  end
end
