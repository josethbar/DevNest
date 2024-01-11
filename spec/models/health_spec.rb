require 'spec_helper'
require 'rails_helper'

RSpec.describe Health, type: :model do

  it 'has a category attribute' do
    expect(Health.new).to respond_to(:category)
  end

  it 'has a description attribute' do
    expect(Health.new).to respond_to(:description)
  end

  it 'assigns the value to the category attribute' do
    health = create(:health)
    health.category = 'New Category'
    expect(health.category).to eq('New Category')
  end


  context 'validations' do
    it 'is invalid without an category' do
      health = Health.new(category: nil , description: "2dias")
      expect(health).not_to be_valid
    end

    it 'is invalid without an description' do
      health = Health.new(category: "mate" , description: nil)
      expect(health).not_to be_valid
    end
  end

  describe '#category=' do
    it 'assigns the value to the category attribute' do
      health = create(:health)
      health.category = 'New Category'
      expect(health.category).to eq('New Category')
    end
  end
end
