module Docs
  module Posts
    extend Dox::DSL::Syntax

    # define common resource data for each action
    document :api do
      resource 'Posts' do
        endpoint '/posts'
        group 'Content'
      end
    end

    # define data for specific action
    document :index do
      action 'Get posts'
    end

    document :show do
      action 'Get post'
    end
  end
end
