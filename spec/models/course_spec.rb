require 'spec_helper'

RSpec.describe Course, type: :model do
  it "is valid with valid atributtes" do 
    course = Course.new(name: "mate", description: "2dias", info: "aprenderemos calculo integral")
expect(course).to be_valid
    end


    context 'validations' do
      it 'is invalid without an name' do
        course = Course.new(name: nil , description: "2dias", info: "aprenderemos calculo integral")
        expect(course).not_to be_valid
      end

      it 'is invalid without an info' do
        course = Course.new(name: "mate" , description: "2días" , info: nil )
        expect(course).not_to be_valid
      end

      it 'is invalid without an description' do
        course = Course.new(name: "mate" , description: nil , info: "aprenderemos calculo integral" )
        expect(course).not_to be_valid
      end

    end
end
