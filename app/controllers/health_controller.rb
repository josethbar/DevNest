class HealthController < ApplicationController
    before_action :authenticate_user!, except: [:show,:index ,:update, :create, :destroy ]
    before_action :set_health, only: [:show, :edit, :destroy]

    def index
        @healths = Health.all
        render json: @healths
    end

    def new
        @health = Health.new
    end

    def show 
        @health = Health.find(params[:id])
        render json: @health
    end

    def create
        @health = Health.new(health_params)
        # authorize @health

        if @health.save
        render json: @health, status: :created
        else
        render json: { errors: @health.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @health = Health.find(params[:id])
        if @health.update(health_params)
        render json: @health, status: :ok
        else
        render json: { errors: @health.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        # authorize @health
        @health = Health.find(params[:id])

        if @health.destroy
        render json: { message: "Registro de salud eliminado correctamente" }, status: :ok
        else
        render json: { message: 'Hubo un error al eliminar el registro de salud' }, status: :unprocessable_entity
        end
    end

    private

    def set_health
        @health = Health.find(params[:id])
    end

    def health_params
        params.require(:health).permit(:category, :description) # Asegúrate de ajustar estos campos según tu modelo Health
    end
end

