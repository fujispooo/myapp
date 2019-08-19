class Tweet < ApplicationRecord
  validates :image, presence: true
  validates :text, presence: true
  has_many :comments
  has_many :likes, dependent: :destroy
  has_many :iine_users, through: :likes, source: :user
  belongs_to :user
  mount_uploader :image, ImagesUploader

  def iine(user)
    likes.create(user_id: user.id)
  end

  def remove_iine(user)
    likes.find_by(user_id: user.id).destroy
  end

  def iine?(user)
    iine_users.include?(user)
  end
end
