class AddUserRefToUserSubject < ActiveRecord::Migration[7.0]
  def change
    add_reference :user_subjects, :user, null: false, foreign_key: true
  end
end
