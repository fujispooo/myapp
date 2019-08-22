class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise  :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable
  has_many :tweets
  has_many :comments
  has_many :likes, dependent: :destroy
  # validates :nickname, presence: true, length: {maximum: 16}

  devise :omniauthable, omniauth_providers: %i[facebook twitter google_oauth2]
  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.nickname = auth.info.name
      user.password = Devise.friendly_token[0,20]
      binding.pry
    end
  end
end
