
class UserGroupsController < ApplicationController
    def create
        group = Group.find_by(id: params[:group_id])
        user = User.find_by(id: params[:user_id])

    if user && group
        begin
            UserGroup.create(user_id: user.id, group_id: group.id)

            render json: { message: 'Usuario agregado al grupo correctamente' }
        rescue ActiveRecord::RecordInvalid => e
            Rails.logger("*** usergroup can not be saved, ERROR: #{e.message} ***")
            render json: { error: "Hubo un problema al agregar el usuario al grupo: #{e.message}" }, status: :unprocessable_entity
        end
        else
            render json: { error: 'Hubo un problema al encontrar el usuario o el grupo' }, status: :not_found
        end
    end
end
