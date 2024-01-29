class CourseGroupController < ApplicationController
  # before_action :authenticate_user!, except: [:assign_group]
  include RackSessionsFix
  before_action :authenticate_user!

  def assign_group

    @course = Course.find(params[:course_id])
    @group = Group.find(params[:group_id])

    # Add any additional debugging statements here

    if @course && @group
      if @course.groups.exists?(@group.id)
        render json: { message: 'El grupo ya está asignado a este curso.' }
      else
        @course.groups << @group
        render json: { message: 'Course was successfully assigned to the group.' }
      end
    else
      render json: { error: 'Failed to assign course to the group.' }, status: :unprocessable_entity
    end
  end
end

  