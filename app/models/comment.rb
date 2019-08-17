class Comment < ApplicationRecord
  belongs_to :tweet
  belongs_to :user
  validates  :text, presence: true, length: { maximum: 30}
  has_many   :replies, class_name: "Comment", foreign_key: :parent_id, dependent: :destroy
end
