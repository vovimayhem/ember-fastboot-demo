module Docs
  module OauthTokens
    extend Dox::DSL::Syntax

    # define common resource data for each action
    document :api do
      resource 'Oauth Access' do
        endpoint '/oauth/token'
        group 'Authentication'
      end
    end

    # define data for specific action
    document :info do
      action 'Get Token Info'
    end
  end
end
