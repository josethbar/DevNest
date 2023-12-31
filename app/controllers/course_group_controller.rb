class CourseGroupController < ApplicationController

    def assign_group
        @course = Course.find(params[:course_id])
        @group = Group.find(params[:group_id])

        if @course.save
            UserGroup.create(course_id: course.id, group_id: group.id)

            redirect_to @course, notice: 'Course was successfully assigned to the group.'
        else
            redirect_to @course, alert: 'Failed to assign course to the group.'
        end
    end
    
end

