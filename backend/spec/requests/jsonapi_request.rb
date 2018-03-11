require 'rails_helper'

RSpec.shared_context 'of an JSONAPI.org request' do

  def jsonapi_request_headers
    { 'Accept' => 'application/vnd.api+json', 'Content-Type' => 'application/vnd.api+json' }
  end

  let(:test_request_headers) { jsonapi_request_headers }
end
