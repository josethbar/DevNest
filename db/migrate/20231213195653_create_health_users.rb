class CreateHealthUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :health_users do |t|
      t.timestamps
    end
  end
end
