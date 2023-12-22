class UserCourseController < ApplicationController
    def create
        user = User.find_by(id: params[:user_id])
        group = Course.find_by(id: params[:course_id])
    
    if user && group
        begin
            UserCourse.transaction do
                user.Course << course
        end
            render json: { message: 'Usuario agregado al curso correctamente' }
        rescue ActiveRecord::RecordInvalid => e
            render json: { error: "Hubo un problema al agregar el usuario al curso: #{e.message}" }, status: :unprocessable_entity
        end
        else
            render json: { error: 'Hubo un problema al encontrar el usuario o el curso' }, status: :not_found
        end
    end
end
