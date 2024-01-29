class MedicalRecord < ApplicationRecord
    belongs_to :user
    validates :suffering, presence: true
    validates :specifications, presence: true
    
end
