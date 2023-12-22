class AddHealthRefToHealthUser < ActiveRecord::Migration[7.0]
  def change
    add_reference :health_users, :health, null: false, foreign_key: true
  end
end
