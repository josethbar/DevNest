class AddCommunicationRefToUserCommunication < ActiveRecord::Migration[7.0]
  def change
    add_reference :user_communications, :communication, null: false, foreign_key: true
  end
end
