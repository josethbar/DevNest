require 'spec_helper'

RSpec.describe CourseGroup, type: :model do
  let(:course) { FactoryBot.create(:course) }
  let(:group) { FactoryBot.create(:group) }
  
  it "es inválido sin un course_id" do
    course_group = CourseGroup.new(group_id: group.id, course_id: nil)
    expect(course_group).not_to be_valid
  end

  it "es inválido sin un group_id" do
    course_group = CourseGroup.new(group_id: nil, course_id: course.id)
    expect(course_group).not_to be_valid  end
end
