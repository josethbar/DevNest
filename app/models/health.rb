class Health < ApplicationRecord

    def category=(value)
        self[:category] = value
    end

    validates :category, presence: true
    validates :description, presence: true

end

