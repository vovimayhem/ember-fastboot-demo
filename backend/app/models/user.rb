# = User
#
# Represents a User in this demo
class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :recoverable and :omniauthable
  devise :database_authenticatable, :registerable, :rememberable,
         :trackable, :validatable

  define_method(:email_required?) { false }
  define_method(:email_changed?) { false }

  # use this instead of email_changed? for rails >= 5.1
  define_method(:will_save_change_to_email?) { false }

  has_many :posts, inverse_of: :author
end
