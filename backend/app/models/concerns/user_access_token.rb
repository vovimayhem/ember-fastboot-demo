# UserAccessToken
#
# Module that associates a Doorkeeper::AccessToken with it's User
module UserAccessToken
  extend ActiveSupport::Concern

  included do
    belongs_to :resource_owner, class_name: :User, foreign_key: :resource_owner_id, optional: true
  end
end
