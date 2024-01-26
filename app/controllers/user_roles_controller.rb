class UserRolesController < ApplicationController
    include RackSessionsFix

    before_action :authenticate_user!
 
    def show
        user = current_user 
        role = user.roles.first 
        render json: { role: role.name }
    end

    def index
        # Obtén todos los usuarios y sus roles
        users_with_roles = User.all.map do |user|
        {
            id: user.id,
            email: user.email,
            role: user.roles.first&.name || 'Sin Rol'
        }
        end

        render json: users_with_roles
    end

    def update_role
        user = User.find(params[:id])
        new_role = params[:role]

        # Verifica que el nuevo rol sea uno de los roles permitidos (student, profesor, admin)
        allowed_roles = ['student', 'professor', 'admin']
        unless allowed_roles.include?(new_role)
                render json: { error: 'Rol no permitido' }, status: :unprocessable_entity
            return
        end

        if user && new_role
            user.roles.destroy_all # Elimina todos los roles actuales
            user.add_role(new_role) # Agrega el nuevo rol

            render json: { message: 'Rol actualizado correctamente' }
        else
            render json: { error: 'Error al actualizar el rol del usuario' }, status: :unprocessable_entity
        end
    end

    
end  