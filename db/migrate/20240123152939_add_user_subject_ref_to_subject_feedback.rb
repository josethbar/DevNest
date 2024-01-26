class AddUserSubjectRefToSubjectFeedback < ActiveRecord::Migration[7.0]
  def change
    add_reference :subject_feedbacks, :user_subject, null: false, foreign_key: true
  end
end
