require 'spec_helper'

RSpec.describe MedicalRecordController, type: :controller do
  let(:user) { create(:user) }
  let(:medical_record) { create(:medical_record) }

  before do
    sign_in user
  end

  describe 'GET #index' do
    it 'returns a successful response' do
      get :index
      expect(response).to have_http_status(:success)
    end

    it 'assigns @medical_records' do
      medical_record # Crear un registro de medical_record
      get :index
      expect(assigns(:medical_records)).to eq(MedicalRecord.all)
    end

    it 'renders the index template' do
      get :index
    expect(response).to have_http_status(:success)
    expect(response.content_type).to eq('application/json; charset=utf-8')
    end
  end

  describe 'GET #show' do
    it 'returns a successful response' do
      get :show, params: { id: medical_record.id }
      expect(response).to have_http_status(:success)
    end

    it 'assigns @medical_record' do
      get :show, params: { id: medical_record.id }
      expect(assigns(:medical_record)).to eq(medical_record)
    end

  end

  describe 'POST #create' do
    context 'with valid attributes' do
      it 'creates a new medical record and returns a created JSON response' do
        expect {
          post :create, params: { medical_record: attributes_for(:medical_record) }
        }.to change(MedicalRecord, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context 'with invalid attributes' do
      it 'does not create a new medical record and returns an unprocessable entity JSON response' do
        expect {
          post :create, params: { medical_record: attributes_for(:medical_record, suffering: nil) }
        }.not_to change(MedicalRecord, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe 'PATCH #update' do
    let(:updated_attributes) { { suffering: 'Updated Suffering' } }


    context 'with invalid attributes' do
      it 'does not update the medical record and returns an unprocessable entity JSON response' do
        patch :update, params: { id: medical_record.id, medical_record: { suffering: nil } }
        medical_record.reload
        expect(medical_record.suffering).not_to eq(nil)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the medical record and returns a successful JSON response' do
      medical_record_to_destroy = create(:medical_record)
      expect {
        delete :destroy, params: { id: medical_record_to_destroy.id }
      }.to change(MedicalRecord, :count).by(-1)
      
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end
  end
end
