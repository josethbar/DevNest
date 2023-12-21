class RemoveUserFromHealth < ActiveRecord::Migration[7.0]
  def change
    remove_column :healths, :user_id, :integer
  end
end
