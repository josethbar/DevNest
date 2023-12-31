# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  
  # respond_to :json
  private
  def respond_with(resource, _opts = {})
    render json: resource
  end
  
  def respond_to_on_destroy
    render json: { message: "Logged out." }
  end

end

# # app/users/sessions_controller.rb
# class Users::SessionsController < Devise::SessionsController
#   respond_to :json
#   private
#   def respond_with(resource, _opts = {})
#     render json: resource
#   end
#   def respond_to_on_destroy
#     render json: { message: "Logged out." }
#   end
# end