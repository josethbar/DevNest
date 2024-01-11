# spec/factories/groups.rb

FactoryBot.define do
   factory :group do
      sequence(:name) { |n| "Group #{n}" }
      quantity { 10 }
      end
   end