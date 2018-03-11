# = Post
#
# Represents a User's Post object in this demo
class Post < ApplicationRecord
  validates :body, presence: true
  belongs_to :author, class_name: :User, inverse_of: :posts
end
