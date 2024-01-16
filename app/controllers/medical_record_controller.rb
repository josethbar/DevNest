class MedicalRecordController < ApplicationController
    before_action :authenticate_user!
    before_action :set_health, only: [:show, :edit, :destroy]

    def index
        @medical_records = MedicalRecord.all
        render json: @medical_records
    end

    def show_users
        @medical_record = MedicalRecord.find(params[:medical_record_id])

        if medical_record
            users = medical_record.users
            render json: { users: users }
        else
            render json: { error: 'Grupo no encontrado' }, status: :not_found
        end
    end
    

    def new
        @medical_record = MedicalRecord.new
    end

    def show 
        @medical_record = MedicalRecord.find(params[:id])
    end

    def create
        @medical_record = MedicalRecord.new(medical_record_params)
        # authorize @groups

        if @medical_record.save
            render json: @medical_record, status: :created
            return
        else
            render json: { errors: @medical_record.errors.full_messages }, status: :unprocessable_entity
        end
        redirect_to "/"
    end



    def update
        # authorize @groups
        respond_to do |format|
            if @medical_record.update(group_params)
                format.html { redirect_to article_url(@medical_record), notice: "Course was successfully updated." }
                format.json { render :show, status: :ok, location: @medical_record }
            else
                format.html { render :edit, status: :unprocessable_entity }
                format.json { render json: @medical_record.errors, status: :unprocessable_entity }
            end
        end

    end


    def destroy

    #   authorize @groups # Implementa tu lógica de autorización aquí, por ejemplo, Pundit o CanCanCan
    @medical_record = MedicalRecord.find(params[:id])


    #   p params[:id]
        if @medical_record.destroy
        puts "Curso eliminado correctamente" 
        render json: { message: "Curso eliminado correctamente" }, status: :ok
        else
        puts "Hubo un error al eliminar el curso"
        render json: { message: 'Hubo un error al eliminar el curso' }, status: :unprocessable_entity
        end
    end


    private

    def set_medical_record
        @medicalRecord = MedicalRecord.find(params[:id])
    end

    def medical_record_params
    params.require(:medical_record).permit(:user_id ,:suffering, :specifications) 
    end

end
