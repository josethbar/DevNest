# app/models/group.rb
class Group < ApplicationRecord
  has_many :user_groups
  has_many :users, through: :user_groups

  has_many :group_courses
  has_many :courses, through: :group_courses

  validates :name, presence: true, uniqueness: true
  validates :quantity, presence: true, numericality: { greater_than_or_equal_to: 0 }

  before_validation :set_default_quantity

  DEFAULT_QUANTITY = 0

    # Add a callback to create UserSubjects for each user when a subject is created
    after_create :create_user_subjects_for_users

  private

  def set_default_quantity
    self.quantity ||= DEFAULT_QUANTITY
  end

  def create_user_subjects_for_users
    users.each do |user|
      subject = subjects.create(name: "Default Subject") # Customize this based on your Subject model
      UserSubject.create(user: user, subject: subject)
    end
  end


end
