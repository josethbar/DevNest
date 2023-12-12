class UserGroupsController < ApplicationController
    def create
        user = User.find(params[:user_id])
        group = Group.find(params[:group_id])
    
        if user && group
            user.groups << group
            render json: { message: 'Usuario agregado al grupo correctamente' }
        else
            render json: { error: 'Hubo un problema al agregar el usuario al grupo' }, status: :unprocessable_entity
        end
    end


    def studentList
        
    end
end
