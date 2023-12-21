class AddUserRefToMedicalRecord < ActiveRecord::Migration[7.0]
  def change
    add_reference :medical_records, :user, null: false, foreign_key: true
  end
end
