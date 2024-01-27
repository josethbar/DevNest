
class UserGroupsController < ApplicationController
    include RackSessionsFix
    
    before_action :authenticate_user!
    
    def index
        user_groups = UserGroup.includes(:user, :group).all
        render json: user_groups, include: [:user, :group]
      end
    
      def group_users
        group = Group.find_by(id: params[:id])
    
        if group
          users = group.users
          render json: users
        else
          render json: { error: 'Grupo no encontrado' }, status: :not_found
        end
      end
    


    def create
        puts "Ruta recibida: #{request.fullpath}"
        group = Group.find_by(id: params[:group_id])
        user =params[:user_id]
        
        # binding.pry
    if user && group
        begin

            UserGroup.transaction do
                UserGroup.create(user_id: user, group_id: group.id)
            end
            # UserGroup.create(user_id: user.id, group_id: group.id)

            render json: { message: 'Usuario agregado al grupo correctamente' }
        rescue ActiveRecord::RecordInvalid => e
            Rails.logger("*** usergroup can not be saved, ERROR: #{e.message} ***")
            render json: { error: "Hubo un problema al agregar el usuario al grupo: #{e.message}" }, status: :unprocessable_entity
        end
        else
            render json: { error: 'Hubo un problema al encontrar el usuario o el grupo' }, status: :not_found
        end
    end

    def destroy
        group = Group.find_by(id: params[:group_id])
        user = User.find_by(id: params[:user_id])
    
        if group && user
            user_group = UserGroup.find_by(group_id: group.id, user_id: user.id)
    
        if user_group
            user_group.destroy
            render json: { message: 'Usuario eliminado del grupo correctamente' }
        else
            render json: { error: 'El usuario no pertenece al grupo' }, status: :not_found
            end
        else
            render json: { error: 'Hubo un problema al encontrar el usuario o el grupo' }, status: :not_found
        end
    end
end
