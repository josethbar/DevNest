FactoryBot.define do
    factory :medical_record do
        # association :user
        suffering { "Some suffering description" }
        specifications { "Some specifications" }
        user_id { create(:user).id }
    end
end