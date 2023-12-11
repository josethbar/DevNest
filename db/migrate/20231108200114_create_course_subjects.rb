class CreateCourseSubjects < ActiveRecord::Migration[7.0]
  def change
    create_table :course_subjects do |t|

      t.timestamps
    end
  end
end
