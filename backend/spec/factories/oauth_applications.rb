FactoryBot.define do
  factory :doorkeeper_application, aliases: [:oauth_application], class: Doorkeeper::Application do
    sequence(:name) { |n| "Test App #{n}" }
  end
end
