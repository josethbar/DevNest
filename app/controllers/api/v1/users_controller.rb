class Api::V1::UsersController < ApplicationController 
  include RackSessionsFix

    before_action :authenticate_user!
    
    
      # GET /api/v1/users
      def index
        if user_signed_in?
          @users = User.all.map do |user|
            {
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              age: user.age,        # Agrega age si es un atributo de tus usuarios
              state: user.state     # Agrega state si es un atributo de tus usuarios
            }
          end
          render json: @users
        else
          render json: { error: 'No autorizado. Inicia sesión para acceder a esta información.' }, status: :unauthorized
        end
      end
      
    
      # GET /api/v1/users/1
    
      def show
        @user = User.find_by(id: params[:id])
    
        unless @user
          render json: { error: 'Usuario no encontrado' }, status: :not_found
          return
        end
    
        user_roles = User.all.map { |user| { id: user.id, role: user.role.name } }
        user_data = {
          id: @user.id,
          first_name: @user.first_name,
          last_name: @user.last_name
        }
        
        questions = @user.questions
    
        render json: user_roles
        render json: { user: user_data, questions: questions }
      end
    
    # POST /api/v1/users
      def create
        user = User.new(user_params)
    
        if user.save
          render json: user, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      # PATCH/PUT /api/v1/users/1
      def update
        if user_params[:avatar]
          @user.avatar.attach(user_params[:avatar])
        end
    

        if @user.update(user_params.except(:avatar))
            render json: @user
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def update_state
      user = User.find(params[:id])
      new_state = params[:state]
  
      allowed_states = ['aprobado', 'en_curso', 'expulsado', 'retirado']
      
      if user && new_state && allowed_states.include?(new_state)
          user.update(state: new_state)
          render json: { user: user_data, questions: questions }, status: :ok

      else
        render json: { error: 'Error al actualizar el estado del usuario', details: error.message }, status: :unprocessable_entity
      end
  end
    
      # DELETE /api/v1/users/1
    def destroy
        @user.destroy
        render json: { message: 'User deleted successfully' }
    end
    
    
    def auth_status
        render json: { user_signed_in: user_signed_in?, current_user: current_user }
    end
    
    
    private
        # Use callbacks to share common setup or constraints between actions.
        def set_user
            @user = User.find(params[:id])
        end
    
        # Only allow a trusted parameter "white list" through.
        def user_params
            params.require(:user).permit(:first_name, :last_name, :description, :email, :encrypted_password, :avatar)
        end


        def show_students
          students = User.with_role(:student)
          render json: students
        end
    end