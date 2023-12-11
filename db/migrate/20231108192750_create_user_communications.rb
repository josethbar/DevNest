class CreateUserCommunications < ActiveRecord::Migration[7.0]
  def change
    create_table :user_communications do |t|

      t.timestamps
    end
  end
end
