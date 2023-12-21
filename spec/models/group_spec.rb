require 'rails_helper'

RSpec.describe Group, type: :model do
    it "is valid with valid atributtes" do 
    group = Group.new(name: "almendra", quantity: "Pericles" )
expect(user).to be_valid
    end
  
  context 'validations' do
  it 'is invalid without an age' do
    group = Group.new(name: "almendra", quantity: "Pericles")    
    expect(group).not_to be_valid
  end

  it 'is invalid without a name' do
    user = User.new(first_name: "karol", last_name: "karol", email: "kaal21@gmail.com", age: nil, password: "12345678")    
    expect(user).not_to be_valid
  end

  it 'is invalid without a last_name' do
    user = User.new(first_name: "karol", last_name: "karol", email: "kaal21@gmail.com", age: nil, password: "12345678")
    expect(user).not_to be_valid
  end
end

describe '#assign_default_role' do
  it 'assigns the role of :student if user has no roles' do
    user = User.new(first_name: "karol", last_name: "karol", email: "kaal21@gmail.com", age: nil, password: "12345678")
    
    expect(user.has_role?(:student)).to be_falsey 
    
    user.assign_default_role
    
    expect(user.has_role?(:student)).to be_truthy 
  end
end
end
