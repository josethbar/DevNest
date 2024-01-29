require 'spec_helper'

RSpec.describe HealthController, type: :controller do

  let(:user) { create(:user) }
  before do
    sign_in user
  end


  describe 'GET #index' do
    it 'returns a successful response' do
      get :index
      expect(response).to have_http_status(:success)
    end

    it 'assigns @healths' do
      health = Health.create(category: 'Some Category', description: 'Some Description')
      get :index
      expect(assigns(:healths)).to eq(Health.all)
    end

    it 'renders the index template' do
      get :index
      expected_json = Health.all.map do |health|
        {
          'id' => health.id,
          'category' => health.category,
          'description' => health.description,
          'created_at' => health.created_at,
          'updated_at' => health.updated_at,
          'user_id' => health.user_id
        }
      end.to_json

      json_response = JSON.parse(response.body)
      expect(json_response).to eq(JSON.parse(expected_json))
    end
  end



  describe 'GET #show' do
    let(:health) { Health.create(category: 'Some Category', description: 'Some Description') }

    it 'returns a successful response' do
      get :show, params: { id: health.id }
      expect(response).to have_http_status(:success)
    end

    it 'assigns @health' do
      get :show, params: { id: health.id }
      expect(assigns(:health)).to eq(health)
    end

    it 'renders the correct JSON' do
      get :show, params: { id: health.id }
      expect(response.content_type).to eq('application/json; charset=utf-8')

      expected_json = {
        'id' => health.id,
        'category' => health.category,
        'description' => health.description,
        'created_at' => health.created_at,
        'updated_at' => health.updated_at,
        'user_id' => health.user_id
      }.to_json

      json_response = JSON.parse(response.body)
      expect(json_response).to eq(JSON.parse(expected_json))
    end
  end

  describe 'PATCH #update' do
    context 'with valid params' do
      it 'updates the requested health record' do
        health = Health.create(category: 'Some Category', description: 'Some Description')
        patch :update, params: { id: health.id, health: { description: 'Updated Description' } }
        health.reload
        expect(health.description).to eq('Updated Description')
      end

      it 'returns a successful response' do
        health = Health.create(category: 'Some Category', description: 'Some Description')
        patch :update, params: { id: health.id, health: { description: 'Updated Description' } }
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid params' do
      it 'returns an unprocessable entity response' do
        health = Health.create(category: 'Some Category', description: 'Some Description')
        patch :update, params: { id: health.id, health: { category: '' } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  
    
    describe 'DELETE #destroy' do
      it 'destroys the requested health record' do
        health = Health.create(category: 'Some Category', description: 'Some Description')
        expect {
          delete :destroy, params: { id: health.id }
        }.to change(Health, :count).by(-1)
      end
  
      it 'returns a successful response' do
        health = Health.create(category: 'Some Category', description: 'Some Description')
        delete :destroy, params: { id: health.id }
        expect(response).to have_http_status(:ok)
      end
    end
    end
  end

