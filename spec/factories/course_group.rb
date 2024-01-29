FactoryBot.define do
    factory :course_group do
        # Add any attributes you need here
        association :course
        association :group
    end
end