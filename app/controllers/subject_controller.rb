class SubjectController < ApplicationController
    before_action :authenticate_user!
    before_action :set_course, only: [:show, :edit, :destroy]

        def index
            @subject = Subject.all
            render json: @subject
        end

        def new
            @subject = Subject.new
        end

        def show 
            @Subject = Subject.find(params[:id])
        end
    
        def create
          @subject = Subject.new(course_params)
          authorize @Subject

            if @subject.save
                render json: @subject, status: :created
                return
            else
                render json: { errors: @subject.errors.full_messages }, status: :unprocessable_entity
            end
            redirect_to "/"
          end


          def update
            @subject = Subject.find(params[:id])
            if @subject.update(subject_params)
              render json: @subject, status: :ok
            else
              render json: { errors: @subject.errors.full_messages }, status: :unprocessable_entity
            end
          end

        

        def destroy
    
          authorize @subject # Implementa tu lógica de autorización aquí, por ejemplo, Pundit o CanCanCan
          @subject = Subject.find(params[:id])
          
      
          p params[:id]
          if @subject.destroy
            puts "Curso eliminado correctamente" 
            render json: { message: "Curso eliminado correctamente" }, status: :ok
          else
            puts "Hubo un error al eliminar el curso"
            render json: { message: 'Hubo un error al eliminar el curso' }, status: :unprocessable_entity
          end
        end


        private

        def set_course
            @subject = Subject.find(params[:id])
          end
    
        def course_params
        params.require(:subject).permit(:name, :description, :info) # Asegúrate de ajustar estos campos según tu modelo Course
        end
    
end
