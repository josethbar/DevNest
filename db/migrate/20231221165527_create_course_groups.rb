class CreateCourseGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :course_groups do |t|

      t.timestamps
    end
  end
end
