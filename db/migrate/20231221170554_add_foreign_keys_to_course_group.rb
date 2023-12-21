class AddForeignKeysToCourseGroup < ActiveRecord::Migration[7.0]
  
    def change
      add_reference :course_groups, :group, foreign_key: true
      add_reference :course_groups, :course, foreign_key: true
    end
  
end
