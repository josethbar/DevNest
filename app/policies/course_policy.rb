# require_relative 'application_policy'
# class CoursePolicy
#   attr_reader :user, :course    
#   def show?
#     # Define aquí la lógica para determinar si un usuario puede ver un post
#     true # Permitir a todos ver los posts por ahora (cambia esto según tus reglas)
#   end

#   def admin?
#     user.present? && user.admin? # Otra verificación similar en admin si es necesario
#   end
  
#   # def create?
#   #   # Define aquí la lógica para determinar si un usuario puede crear un post
#   #   user.present? # Permitir solo a usuarios autenticados crear posts
#   # end

#   # Define más métodos para otras acciones como update? o destroy?

#   def initialize(user, course)
#     @user = user
#     @course = course
#   end

#   def index 
#     true
#   end

#   def edit?
#     update?
#   end

#   def create?
#     user.admin? 
#   end

#     def destroy?
#       user.present? && user.admin?
#     end

  
# end





class CoursePolicy
  attr_reader :user, :course

  def initialize(user, course)
    @user = user
    @course = course
  end

  def show?
    true # Lógica para mostrar un curso, permisos actuales
  end
  
  def create?
    # binding.pry
    user.admin? # Solo un admin puede crear cursos
    # true
  end

  def update?
    true
    # user.present? && (user.admin? || course.user == user) # Admin o propietario pueden actualizar
  end

  def destroy?
    # # binding.pry 
    # puts "entra en el destroy"
    # if user.present?
    #   puts "1. ", user.presence
    #   puts "2. ", user.admin if user.respond_to?(:admin)
    #   user.admin? # Solo un admin puede eliminar cursos
    # else
    #   false # Si el usuario no está presente, no se le permite la acción
    # end
  end
  

  # Otros métodos de política aquí...

end
