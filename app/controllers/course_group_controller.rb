# class CourseGroupController < ApplicationController
#     def assign_group
#         @course = Course.find(params[:course_id])
#         @group = Group.find(params[:group_id])
#         if @course && @group && !@course.groups.include?(@group)
#         # @course.groups << @group
#         # render json: "hola"
#         # redirect_to @course, notice: 'Course was successfully assigned to the group.'
#         # else
#         # redirect_to @course, alert: 'Failed to assign course to the group.'
#         end
#     end
# end
class CourseGroupController < ApplicationController
    def assign_group
        puts "Course ID: #{params[:course_id]}, Group ID: #{params[:group_id]}"
      @course = Course.find(params[:course_id])
      @group = Group.find(params[:group_id])

      puts "Course: #{@course.inspect}"
      puts "Group: #{@group.inspect}"
  
    # binding.pry
      if @course && @group && !@course.groups.include?(@group)

        # Asegúrate de que el nombre de la tabla refleje la nomenclatura pluralizada
        # y en minúsculas según las convenciones de Rails.
        # CourseGroup.create(course: @course, group: @group)
        @course.groups << @group

  
        render json: { message: 'Course was successfully assigned to the group.' }
        #me responde esto en insomnia
      else
        render json: { error: 'Failed to assign course to the group.' }, status: :unprocessable_entity
      end
    end
  end
  