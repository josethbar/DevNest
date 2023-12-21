
class UserGroupsController < ApplicationController
    def create
        # binding.pry
        # user = User.find_by(id: params[:user_id])
        # group = Group.find_by(id: params[:group_id])
        # user.presence
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


# def add_user_to_group
#     # Código para agregar un usuario a un grupo según los parámetros recibidos
#     # Puedes acceder a los parámetros group_id y user_id con params[:group_id] y params[:user_id] respectivamente
    
#     # Por ejemplo:
#     group = Group.find(params[:group_id])
#     user = User.find(params[:user_id])

#     # Agregar lógica para agregar el usuario al grupo
#     # ...

#     # Responder con un código de estado apropiado
#     render json: { message: 'Usuario agregado al grupo' }, status: :ok
# end
