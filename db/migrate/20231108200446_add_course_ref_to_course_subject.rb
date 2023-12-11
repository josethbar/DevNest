class AddCourseRefToCourseSubject < ActiveRecord::Migration[7.0]
  def change
    add_reference :course_subjects, :course, null: false, foreign_key: true
  end
end
