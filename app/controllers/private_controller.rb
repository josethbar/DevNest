class PrivateController < ApplicationController
  before_action :authenticate_user!, except: [:welcome]

  def test
    render json: {
      message: "This is a secret message. You are seeing it because you have successfully logged in." 
    }
  end

  def welcome
    render json: {
      message: "Welcome to FWD" 
    }
  end
end


# class PrivateController < ApplicationController
#   before_action :authenticate_user!
#   def test
#     render json: {
#       message: "This is a secret message. You are seeing it because you have successfully logged in." 
#     }
#   end
# end