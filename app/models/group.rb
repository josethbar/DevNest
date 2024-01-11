# app/models/group.rb
class Group < ApplicationRecord
    has_many :user_groups
    has_and_belongs_to_many :courses
    has_many :users, through: :user_groups
  
    validates :name, presence: true, uniqueness: true
    validates :quantity, presence: true, numericality: { greater_than_or_equal_to: 0 }
  
    before_validation :set_default_quantity
  
    DEFAULT_QUANTITY = 0
  
    private
  
    def set_default_quantity
      self.quantity ||= DEFAULT_QUANTITY
    end
  end