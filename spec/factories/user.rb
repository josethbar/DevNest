
FactoryBot.define do
        factory :user do
        first_name { "John" }
        last_name { "Doe" }
        age { 25 }
        state { "Activo" }
        jti { "token123" }
        email { "john.doe@example.com" }
        password { "password123" }
    end
end
