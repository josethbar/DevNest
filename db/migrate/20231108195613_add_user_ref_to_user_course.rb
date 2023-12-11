class AddUserRefToUserCourse < ActiveRecord::Migration[7.0]
  def change
    add_reference :user_courses, :user, null: false, foreign_key: true
  end
end
