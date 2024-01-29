FactoryBot.define do
  factory :subject do
    sequence(:name) { |n| "Subject #{n}" }
    type { "project" }
    description { "Some Description" }
    grade { "Some Grade" }
  end
end
