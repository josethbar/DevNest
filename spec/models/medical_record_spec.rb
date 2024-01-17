require 'spec_helper'



RSpec.describe MedicalRecord, type: :model do
  describe 'validaciones' do
    it 'es válido con atributos válidos' do
      medical_record = FactoryBot.build(:medical_record)
      expect(medical_record).to be_valid
    end

    it 'es inválido sin suffering' do
      medical_record = FactoryBot.build(:medical_record, suffering: nil)
      expect(medical_record).not_to be_valid
      expect(medical_record.errors[:suffering]).to include("can't be blank")
    end

    it 'es inválido sin specifications' do
      medical_record = FactoryBot.build(:medical_record, specifications: nil)
      expect(medical_record).not_to be_valid
      expect(medical_record.errors[:specifications]).to include("can't be blank")
    end
  end
end
