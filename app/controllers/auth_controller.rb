# app/controllers/auth_controller.rb
class AuthController < ApplicationController
  before_action :authenticate_user!

  def refresh_token
    refresh_token = params[:refreshToken]
    
    # Verifica si el refreshToken es válido y emite un nuevo access token
    if refresh_token_valid?(refresh_token)
      new_access_token = generate_new_access_token(current_user)
      render json: { accessToken: new_access_token }
    else
      render json: { error: 'Invalid refresh token' }, status: :unauthorized
    end
  end

  private

  # Verificación de validez del refresh token
  def refresh_token_valid?(refresh_token)



class AuthController < ApplicationController
  def refresh_token
    refresh_token = params[:refresh_token]

    # Verifica si el token de actualización es válido
    if refresh_token_valid?(refresh_token)
      new_access_token = generate_new_access_token(current_user)
      render json: { access_token: new_access_token }
    else
      render json: { error: 'Invalid refresh token' }, status: :unauthorized
    end
  end

  private

  # Verifica si el token de actualización es válido
  def refresh_token_valid?(refresh_token)
    # Verificar la validez del token de actualización según tus reglas de negocio
    # Podrías verificar la firma del token, la expiración, etc.
    # Por ejemplo, utilizando la gema Devise-JWT:
    Devise.secure_compare(
      refresh_token,
      current_user.refresh_token # Aquí debes tener el campo de refresh_token en tu modelo de usuario
    )
  end

  # Generación de nuevo access token
  def generate_new_access_token(user)
    payload = { user_id: user.id }
    JWT.encode(payload, Devise::JWT.config.secret_key)
  end
end
