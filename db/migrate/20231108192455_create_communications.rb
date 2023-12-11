class CreateCommunications < ActiveRecord::Migration[7.0]
  def change
    create_table :communications do |t|
      t.string :issue
      t.string :text

      t.timestamps
    end
  end
end
