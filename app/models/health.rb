class Health < ApplicationRecord
    validates :category, presence: true
    validates :description, presence: true
end

