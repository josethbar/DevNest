class Group < ApplicationRecord
    has_many :user_groups
    has_many :courses
    has_many :users, through: :user_groups

    validates :name, presence: true
    validates :quantity, presence: true
    
end
