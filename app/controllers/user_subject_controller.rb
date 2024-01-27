    class UserSubjectController < ApplicationController
        include RackSessionsFix

        before_action :authenticate_user!
        before_action :set_user_subject, only: [:show, :update, :destroy]
    
        def index
            @user_subjects = UserSubject.all
            render json: @user_subjects
        end
    
        def show
            render json: @user_subject
        end
    
        def create
            @user_subject = UserSubject.new(user_subject_params)
            
            unless User.exists?(id: params[:user_subject][:user_id])
                render json: { error: 'User does not exist' }, status: :unprocessable_entity
                return
            end
        
            unless Subject.exists?(id: params[:user_subject][:subject_id])
                render json: { error: 'Subject does not exist' }, status: :unprocessable_entity
                return
            end
        
            if @user_subject.save
                render json: @user_subject, status: :created
            else
                render json: { errors: @user_subject.errors.full_messages }, status: :unprocessable_entity
            end
        end
        
    
        def update
            if @user_subject.update(user_subject_params)
                render json: @user_subject
            else
                render json: { errors: @user_subject.errors.full_messages }, status: :unprocessable_entity
            end
        end
    
        def destroy
            @user_subject.destroy
            head :no_content
        end
    
        private
    
        def set_user_subject
            @user_subject = UserSubject.find(params[:id])           
        end
    
        def user_subject_params
            params.require(:user_subject).permit(:state, :grade, :user_id, :subject_id)
        end
    end
    