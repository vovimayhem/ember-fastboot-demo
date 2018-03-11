require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of :body }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:author).class_name(:User).inverse_of :posts }
  end
end
