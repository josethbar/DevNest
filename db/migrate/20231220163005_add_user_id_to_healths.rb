
    class AddUserIdToHealths < ActiveRecord::Migration[7.0]
      def change
        add_column :healths, :user_id, :bigint
        add_foreign_key :healths, :users
      end
    end

