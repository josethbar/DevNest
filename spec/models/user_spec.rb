require 'spec_helper'
# require_relative '../../app/models/user.rb'

RSpec.describe User, type: :model do
    it "is valid with valid atributtes" do 
    user = User.new(first_name: "karol", last_name: "Almedra", email: "kaal21@gmail.com",  age: 21 , password: "12345678" )
expect(user).to be_valid
    end
  
  context 'validations' do
  it 'is invalid without an age' do
    user = User.new(first_name: "karol", last_name: "karol", email: "kaal21@gmail.com", age: nil, password: "12345678")    
    expect(user).not_to be_valid
  end

  it 'is invalid without a first_name' do
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
