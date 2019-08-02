class Comment < ApplicationRecord

  belongs_to :tweet
  belongs_to :user
  validates :text, presence: true, length: { maximum: 30}
end
