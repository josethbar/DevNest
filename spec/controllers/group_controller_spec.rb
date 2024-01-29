require 'spec_helper'
require 'rails_helper'

RSpec.describe GroupController, type: :controller do
  describe 'GET #index' do
    it 'returns a success response' do
      get :index
      expect(response).to be_successful
    end
  end

  describe 'GET #show_users' do
    let(:group) { FactoryBot.create(:group) }

    it 'returns a success response' do
      get :show_users, params: { group_id: group.id }
      expect(response).to be_successful
    end

    it 'returns a not found response invalid group' do
      get :show_users, params: { group_id: 'invalid_id' }
      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'GET #show' do
    let(:group) { FactoryBot.create(:group) }

    it 'returns a success response' do
      get :show, params: { id: group.id }
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'with valid parameters' do
      it 'creates a new group' do
        expect {
          post :create, params: { groups: FactoryBot.attributes_for(:group) }
        }.to change(Group, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new group' do
        expect {
          post :create, params: { groups: FactoryBot.attributes_for(:group, name: nil) }
        }.not_to change(Group, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end


  describe 'PATCH #update' do
    let(:group) { FactoryBot.create(:group) }

    context 'with valid parameters' do
      it 'updates the group' do
        patch :update, params: { id: group.id, groups: { name: 'New Name' } }
        group.reload
        expect(group.name).to eq('New Name')
        expect(response).to redirect_to(group_url(group))
      end
    end

    context 'with invalid parameters' do
      it 'does not update the group' do
        patch :update, params: { id: group.id, groups: { name: nil } }
        group.reload
        expect(group.name).not_to be_nil
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:group) { FactoryBot.create(:group) }

    it 'destroys the requested group' do
      expect {
        delete :destroy, params: { id: group.id }
      }.to change(Group, :count).by(-1)
      expect(response).to have_http_status(:ok)
    end
  end
end
