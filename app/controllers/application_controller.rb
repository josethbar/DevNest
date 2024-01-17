class ApplicationController < ActionController::API
    # binding.pry
    # include Pundit::Authorization
    before_action :authenticate_user!

    include Pundit::Authorization
    # after_action :verify_authorized

    # def pundit_user
    #     AuthorizationContext.new(current_user, current_office)
    # end


    #configuración de devise conectando react
    before_action :configure_permitted_parameters, if: :devise_controller?

    #guía
    # before_action :configure_permitted_parameters, if: :devise_controller?
    # protected
    # def configure_permitted_parameters
    #   devise_parameter_sanitizer.permit(:sign_up, keys: %i[name avatar])
    #   devise_parameter_sanitizer.permit(:account_update, keys: %i[name avatar])
    # end
    #

    protected
    

    def index
        # Verifica si el usuario tiene el rol 'admin' utilizando Rolify
        if current_user.has_role?(:admin)
            # El usuario tiene el rol de administrador, realiza las acciones que correspondan
            @users = User.all
            render json: @users
        else    
            # Si el usuario no tiene el rol de administrador, devuelve un error 403 (Forbidden)
            render json: { error: 'No tienes permisos para acceder a esta ruta.' }, status: :forbidden
        end
    end
    

    def configure_permitted_parameters
    # binding.pry
        attributes = [:last_name, :first_name, :age]
        devise_parameter_sanitizer.permit(:sign_up, keys: attributes)
        devise_parameter_sanitizer.permit(:login, keys: attributes)
    end
end


