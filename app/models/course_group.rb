class CourseGroup < ApplicationRecord
    belongs_to :course
    belongs_to :group
    validates_presence_of  :course_id, :group_id
end
