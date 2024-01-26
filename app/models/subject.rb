class Subject < ApplicationRecord
  validates :name, presence: true
  validates :type, presence: true
  validates :description, presence: true
  validates :grade, presence: true
  # validate :file_attached, if: :file_attached?

  has_one_attached :file

  self.inheritance_column = :_type_disabled

  SUBJECT_TYPE_OPTIONS = ["material", "project", "homework"]

  private

  # def file_attached?
  #   file.attached?
  # end
end
