class RemoveSubjectFromSubjectFeedback < ActiveRecord::Migration[7.0]
  def change
    remove_reference :subject_feedbacks, :subject, null: false, foreign_key: true
  end
end
