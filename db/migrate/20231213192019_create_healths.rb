class CreateHealths < ActiveRecord::Migration[7.0]
  def change
    create_table :healths do |t|
      t.string :type
      t.string :description
      t.timestamps
    end
  end
end
