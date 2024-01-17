class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  rolify

  devise :database_authenticatable, :registerable,
  :recoverable, :validatable, 
  :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :user_groups
  has_many :groups, through: :user_groups
  belongs_to :group, optional: true
  
    # rolify :before_add => :before_add_method
    after_create :assign_default_role


    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :age, presence: true
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable


    def assign_default_role
      self.add_role(:student) if self.roles.blank?
    end
end