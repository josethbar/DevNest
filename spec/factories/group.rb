# spec/factories/groups.rb

FactoryBot.define do
   factory :group do
      sequence(:name) { |n| "Group #{n+1}" }
      quantity { 10 }
   end
end