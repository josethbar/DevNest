# app/models/subject.rb
class Subject < ApplicationRecord
    validates :name, presence: true
    validates :type, presence: true
    validates :description, presence: true
    validates :grade, presence: true
    
    self.inheritance_column = :_type_disabled

  end
  




