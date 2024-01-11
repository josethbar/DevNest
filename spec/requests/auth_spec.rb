require 'rails_helper'

RSpec.describe "Auths", type: :request do
  describe "GET /refresh_token" do
    it "returns http success" do
      get "/auth/refresh_token"
      expect(response).to have_http_status(:success)
    end
  end

end
