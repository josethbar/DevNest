class AddFileToSubject < ActiveRecord::Migration[7.0]
  def change
    add_column :subjects, :file, :attachment
  end
end
