class UserSubject < ApplicationRecord
  has_one_attached :file

  belongs_to :user
  belongs_to :subject
  
end

