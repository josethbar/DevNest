class GroupController < ApplicationController
    include RackSessionsFix
    
        before_action :authenticate_user!
        before_action :set_course, only: [:show, :edit, :update, :destroy]
    
            def index
                @groups = Group.all
                render json: @groups
                #authorize @courses # Verifica la autorización usando Pundit
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

            # def show_users
            #     @group = Group.find(params[:group_id])

            #     if @group
            #         users = @group.users
            #         render json: { users: users }
            #     else
            #         render json: { error: 'Grupo no encontrado' }, status: :not_found
            #     end
            # end      
            
            def users
                group = Group.find(params[:id])
                users = group.users
            
                render json: { users: users }
                rescue ActiveRecord::RecordNotFound
                render json: { error: 'Group not found' }, status: :not_found
            end
            



            
            def show_by_name
                @group = Group.find_by(name: params[:name])
            
                if @group
                    render json: @group
                else
                    render json: { error: 'Grupo no encontrado' }, status: :not_found
                end
            end
            
    
            def new
                @group = Group.new
            end
    
            def show 
                @group = Group.find(params[:id])
            end
        
            def create
                @group = Group.new(group_params)
                # authorize @groups
    
                if @group.save
                    render json: @group, status: :created
                    return
                else
                    render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
                end
                redirect_to "/"
            end



            def update
                # authorize @groups
                respond_to do |format|
                    if @group.update(group_params)
                        format.html { redirect_to article_url(@group), notice: "Course was successfully updated." }
                        format.json { render :show, status: :ok, location: @group }
                    else
                        format.html { render :edit, status: :unprocessable_entity }
                        format.json { render json: @group.errors, status: :unprocessable_entity }
                    end
                end
    
            end
    
    
    def destroy
        if @group.destroy
        puts "Grupo eliminado correctamente" 
        render json: { message: "Grupo eliminado correctamente" }, status: :ok
        else
        puts "Hubo un error al eliminar el grupo"
        render json: { message: 'Hubo un error al eliminar el grupo' }, status: :unprocessable_entity
        end
    end
    
    
            private
    
            def set_course
                @group = Group.find(params[:id])
            end
            
        
            def group_params
            params.require(:groups).permit(:name, :quantity) # Asegúrate de ajustar estos campos según tu modelo Course
            end
    
            
    end
        

