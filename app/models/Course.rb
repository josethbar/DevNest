# app/models/course.rb
class Course < ApplicationRecord
  resourcify
  belongs_to :group
  validates :name, presence: true
  validates :description, presence: true
  validates :info, presence: true

  
    # Define tus relaciones, validaciones u otras lógicas aquí
  end
  