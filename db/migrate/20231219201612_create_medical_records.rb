class CreateMedicalRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :medical_records do |t|
      t.string :suffering
      t.string :specifications

      t.timestamps
    end
  end
end
