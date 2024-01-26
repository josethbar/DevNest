class SubjectController < ApplicationController
  before_action :authenticate_user!

  def index
    @subjects = Subject.all
    render json: @subjects
  end

  def subject_types
    render json: Subject::SUBJECT_TYPE_OPTIONS
  end

  def new
    @subject = Subject.new
  end

  def show
    @subject = Subject.find(params[:id])
    render json: @subject
  end

  def create
    @subject = Subject.new(subject_params)
  
    ActiveRecord::Base.transaction do
      if @subject.save
        user_id = params.dig(:user_subject, :user_id)
        user = User.find_by(id: user_id)
  
        if user
          user_subject_params = {
            user: user,
            subject: @subject,
            state: '',
            grade: 0,
            feedback: ''
          }
  
          UserSubject.create(user_subject_params)
  
          render json: @subject, status: :created
        else
          puts "User not found for user_id: #{user_id}"  # Agregamos este mensaje
          render json: { error: 'No se proporcionó un ID de usuario válido' }, status: :unprocessable_entity
        end
      else
        render json: { errors: @subject.errors.full_messages }, status: :unprocessable_entity
      end
    end
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
    @subject = Subject.find(params[:id])

    if @subject.destroy
      Rails.logger.info("Curso eliminado correctamente") 
      render json: { message: "Curso eliminado correctamente" }, status: :ok
    else
      Rails.logger.info("Hubo un error al eliminar el curso")
      render json: { message: 'Hubo un error al eliminar el curso' }, status: :unprocessable_entity
    end
  end

  private

  def subject_params
    params.require(:subject).permit(:name, :type, :description, :grade)
  end
end
