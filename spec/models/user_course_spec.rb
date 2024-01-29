require 'spec_helper'

RSpec.describe UserCourse, type: :model do
  let!(:user) { create(:user) }
  let!(:course) { create(:course) }

  it "es válido con atributos válidos" do
    user_course = build(:user_course, user: user, course: course)
    expect(user_course).to be_valid
  end

  it "es inválido sin un usuario" do
    user_course = build(:user_course, user: nil, course: course)
    expect(user_course).not_to be_valid
  end

  it "es inválido sin una asignatura" do
    user_course = build(:user_course, user: user, course: nil)
    expect(user_course).not_to be_valid
  end
end
