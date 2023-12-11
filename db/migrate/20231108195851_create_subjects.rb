class CreateSubjects < ActiveRecord::Migration[7.0]
  def change
    create_table :subjects do |t|
      t.string :name
      t.string :type
      t.string :description
      t.integer :grade

      t.timestamps
    end
  end
end
