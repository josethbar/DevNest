class MedicalRecord < ApplicationRecord

    validates :suffering, presence: true
    validates :specifications, presence: true
    
end
