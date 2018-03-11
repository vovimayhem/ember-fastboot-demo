require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build :user }

  describe 'validations' do
    it { is_expected.to validate_presence_of :username }
    it { is_expected.to validate_uniqueness_of(:username).ignoring_case_sensitivity.with_message 'has already been taken' }
  end

  describe 'associations' do
    it { is_expected.to have_many(:posts).class_name(:Post).inverse_of :author }
  end
end
