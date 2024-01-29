
FactoryBot.define do
        factory :user do
        first_name { "John" }
        last_name { "Doe" }
        age { 25 }
        state { "Activo" }
        jti { "token123" }
        sequence(:email) { |n| "user#{n +1}@example.com" }
        password { "password123" }
    end
end
