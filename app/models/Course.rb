# app/models/course.rb
class Course < ApplicationRecord
  resourcify

  has_many :course_groups
has_many :groups, through: :course_groups

  # has_and_belongs_to_many :groups
  validates :name, presence: true
  validates :description, presence: true
  validates :info, presence: true

  
    # Define tus relaciones, validaciones u otras lógicas aquí
  end
  