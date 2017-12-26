# TrustableOauthApp
#
# Module that adds the `trusted?` method to the Doorkeeper::Application class
module TrustableOauthApp
  extend ActiveSupport::Concern

  def trusted?
    !!trusted
  end
end
