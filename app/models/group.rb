# app/models/group.rb
class Group < ApplicationRecord
  has_many :user_groups
  has_many :users, through: :user_groups

  has_many :group_courses
  has_many :courses, through: :group_courses

  validates :name, presence: true, uniqueness: true
  validates :quantity, presence: true, numericality: { greater_than_or_equal_to: 0 }

  before_validation :set_default_quantity

  DEFAULT_QUANTITY = 0

  private

  def set_default_quantity
    self.quantity ||= DEFAULT_QUANTITY
  end
end
