class UserRolesController < ApplicationController
    include RackSessionsFix

    before_action :authenticate_user!
    def show
        user = current_user 
        role = user.roles.first 
        render json: { role: role.name }
    end
end
