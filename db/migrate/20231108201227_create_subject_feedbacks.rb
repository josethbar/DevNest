class CreateSubjectFeedbacks < ActiveRecord::Migration[7.0]
  def change
    create_table :subject_feedbacks do |t|
      t.string :comment

      t.timestamps
    end
  end
end
