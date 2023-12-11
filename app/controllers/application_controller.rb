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

    protected


    

    def configure_permitted_parameters
    # binding.pry
        attributes = [:last_name, :first_name, :age]
        devise_parameter_sanitizer.permit(:sign_up, keys: attributes)
        devise_parameter_sanitizer.permit(:login, keys: attributes)
    end
end


