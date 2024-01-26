class CreateUserSubjects < ActiveRecord::Migration[7.0]
  def change
    create_table :user_subjects do |t|
      t.string :state
      t.integer :grade

      t.timestamps
    end
  end
end
