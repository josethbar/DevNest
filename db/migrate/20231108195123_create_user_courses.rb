class CreateUserCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :user_courses do |t|
      t.integer :grade
      t.string :performance

      t.timestamps
    end
  end
end
