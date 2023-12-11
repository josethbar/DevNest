class AddGroupRefToUserGroups < ActiveRecord::Migration[7.0]
  def change
    add_reference :user_groups, :group, null: false, foreign_key: true
  end
end
