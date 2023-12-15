class GroupController < ApplicationController
        before_action :authenticate_user!, except: [:index, :show ,:create, :destroy]
        before_action :set_course, only: [:show, :edit, :update, :destroy]
    
            def index
                @groups = Group.all
                render json: @groups
                #authorize @courses # Verifica la autorización usando Pundit
            end

            def show_users
                @group = Group.find(params[:group_id])

                if group
                    users = group.users
                    render json: { users: users }
                else
                    render json: { error: 'Grupo no encontrado' }, status: :not_found
                end
            end
    
            def new
                @groups = Group.new
            end
    
            def show 
                @groups = Group.find(params[:id])
            end
        
            def create
                @groups = Group.new(group_params)
                # authorize @groups
    
                if @groups.save
                    render json: @groups, status: :created
                    return
                else
                    render json: { errors: @groups.errors.full_messages }, status: :unprocessable_entity
                end
                redirect_to "/"
            end

            def update
                # authorize @groups
                respond_to do |format|
                    if @groups.update(group_params)
                        format.html { redirect_to article_url(@groups), notice: "Course was successfully updated." }
                        format.json { render :show, status: :ok, location: @groups }
                    else
                        format.html { render :edit, status: :unprocessable_entity }
                        format.json { render json: @group.errors, status: :unprocessable_entity }
                    end
                end
    
            end
    
    
            def destroy
        
            #   authorize @groups # Implementa tu lógica de autorización aquí, por ejemplo, Pundit o CanCanCan
            @groups = Group.find(params[:id])


            #   p params[:id]
                if @groups.destroy
                puts "Curso eliminado correctamente" 
                render json: { message: "Curso eliminado correctamente" }, status: :ok
                else
                puts "Hubo un error al eliminar el curso"
                render json: { message: 'Hubo un error al eliminar el curso' }, status: :unprocessable_entity
                end
            end
    
    
            private
    
            def set_course
                @groups = Group.find(params[:id])
            end
        
            def group_params
            params.require(:groups).permit(:name, :quantity) # Asegúrate de ajustar estos campos según tu modelo Course
            end
    
            
    end
        

