class Tweet < ApplicationRecord
  validates :image, presence: true
  validates :text, presence: true
  has_many :comments
  belongs_to :user
  mount_uploader :image, ImagesUploader
end
