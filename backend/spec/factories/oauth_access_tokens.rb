FactoryBot.define do
  factory :oauth_access_token, class: Doorkeeper::AccessToken do
    sequence(:token) { |n| "XXXXXXXXXX-#{n}-XXXXXXXXXXXX" }

    trait :with_oauth_application do
      association :application, factory: :oauth_application
    end
  end
end
