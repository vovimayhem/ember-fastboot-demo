FactoryBot.define do
  factory :post do
    association :author, factory: :user
    sequence(:body) { |n| "Sample Text #{n}" }
  end
end
