class CourseController < ApplicationController
  include RackSessionsFix

    before_action :authenticate_user!
    
    before_action :set_course, only: [:show, :edit, :destroy]

        def index
          # authorize @courses # Verifica la autorización usando Pundit
            @courses = Course.all
            render json: @courses
        end

        def new
            @course = Course.new
        end

        def show 
            @course = Course.find(params[:id])
        end
    
        def create
          @course = Course.new(course_params)
          authorize @course

            if @course.save
                render json: @course, status: :created
                return
            else
                render json: { errors: @course.errors.full_messages }, status: :unprocessable_entity
            end
            redirect_to "/"
          end


          def update
            @course = Course.find(params[:id])
            if @course.update(course_params)
              render json: @course, status: :ok
            else
              render json: { errors: @course.errors.full_messages }, status: :unprocessable_entity
            end
          end

        

        def destroy
    
          authorize @course # Implementa tu lógica de autorización aquí, por ejemplo, Pundit o CanCanCan
          @course = Course.find(params[:id])
          
      
          p params[:id]
          if @course.destroy
            puts "Curso eliminado correctamente" 
            render json: { message: "Curso eliminado correctamente" }, status: :ok
          else
            puts "Hubo un error al eliminar el curso"
            render json: { message: 'Hubo un error al eliminar el curso' }, status: :unprocessable_entity
          end
        end


        private

        def set_course
            @course = Course.find(params[:id])
          end
    
        def course_params
        params.require(:course).permit(:name, :description, :info) # Asegúrate de ajustar estos campos según tu modelo Course
        end

        
end
    