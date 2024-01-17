class CourseGroupController < ApplicationController
  # before_action :authenticate_user!, except: [:assign_group]
  include RackSessionsFix
  before_action :authenticate_user!

  def assign_group
    puts "Received request to assign group:"
    puts "Course ID: #{params[:course_id]}, Group ID: #{params[:group_id]}"

    # Log headers for debugging
    # binding.pry
    puts "Authorization Header: #{request.headers['Authorization']}"

    @course = Course.find(params[:course_id])
    @group = Group.find(params[:group_id])

    puts "Course: #{@course.inspect}"
    puts "Group: #{@group.inspect}"

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

  