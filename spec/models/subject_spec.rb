# spec/models/subject_spec.rb

require 'spec_helper'

RSpec.describe Subject, type: :model do
  before do
    # Desactivar la herencia única para estos tests
    Subject.inheritance_column = :_type_disabled
  end

  after do
    # Restaurar la configuración de herencia única
    Subject.inheritance_column = :type
  end

  describe 'validations' do
    it 'validates presence of name' do
      subject = Subject.new(type: 'Science', description: 'Description', grade: 'A')
      expect(subject).not_to be_valid
      expect(subject.errors[:name]).to include("can't be blank")
    end

    it 'validates presence of type' do
      subject = Subject.new(name: 'Math', description: 'Description', grade: 'A')
      expect(subject).not_to be_valid
      expect(subject.errors[:type]).to include("can't be blank")
    end

    it 'validates presence of description' do
      subject = Subject.new(name: 'Math', type: 'Science', grade: 'A')
      expect(subject).not_to be_valid
      expect(subject.errors[:description]).to include("can't be blank")
    end

    it 'validates presence of grade' do
      subject = Subject.new(name: 'Math', type: 'Science', description: 'Description')
      expect(subject).not_to be_valid
      expect(subject.errors[:grade]).to include("can't be blank")
    end
  end

  describe 'attributes' do
    it { should respond_to(:name) }
    it { should respond_to(:type) }
    it { should respond_to(:description) }
    it { should respond_to(:grade) }
  end
end
