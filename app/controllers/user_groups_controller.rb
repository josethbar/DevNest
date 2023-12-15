
class UserGroupsController < ApplicationController
    def create
        user = User.find_by(id: params[:user_id])
        group = Group.find_by(id: params[:group_id])
    
    if user && group
        begin
            UserGroup.transaction do
                user.groups << group
        end
            render json: { message: 'Usuario agregado al grupo correctamente' }
        rescue ActiveRecord::RecordInvalid => e
            render json: { error: "Hubo un problema al agregar el usuario al grupo: #{e.message}" }, status: :unprocessable_entity
        end
        else
            render json: { error: 'Hubo un problema al encontrar el usuario o el grupo' }, status: :not_found
        end
    end
end
