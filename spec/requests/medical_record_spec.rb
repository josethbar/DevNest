require 'spec_helper'

RSpec.describe MedicalRecord, type: :model do
  it "es válido con atributos válidos" do
    medical_record = build(:medical_record)
    expect(medical_record).to be_valid
  end

  it "es inválido sin sufrimiento" do
    medical_record = build(:medical_record, suffering: nil)
    expect(medical_record).not_to be_valid
  end

  it "es inválido sin especificaciones" do
    medical_record = build(:medical_record, specifications: nil)
    expect(medical_record).not_to be_valid
  end
end
