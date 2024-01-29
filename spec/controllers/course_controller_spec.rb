# spec/controllers/course_controller_spec.rb

require 'spec_helper'

RSpec.describe CourseController, type: :controller do
  let(:user) { create(:user) }
  let(:course) { create(:course) }

  before do
    sign_in user
  end

  describe "GET #index" do
    it "returns a successful JSON response" do
      get :index
      expect(response).to be_successful
      expect(response.content_type).to eq("application/json; charset=utf-8")
    end
  end

  describe "GET #new" do
    it "returns a successful response for GET #new" do
      get :new
      expect(response).to be_successful
    end
  end

  describe "GET #show" do
    it "returns a successful response for GET #show" do
      get :show, params: { id: course.id }
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    context "with valid attributes" do
      it "creates a new course and returns a created JSON response" do
        expect {
          post :create, params: { course: attributes_for(:course) }
        }.to change(Course, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end

    context "with invalid attributes" do
      it "does not create a new course and returns an unprocessable entity JSON response" do
        expect {
          post :create, params: { course: attributes_for(:course, name: nil) }
        }.not_to change(Course, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "PATCH #update" do
    context "with valid attributes" do
      it "updates the course and returns a successful JSON response" do
        patch :update, params: { id: course.id, course: { name: "New Name" } }
        expect(course.reload.name).to eq("New Name")
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end

    context "with invalid attributes" do
      it "does not update the course and returns an unprocessable entity JSON response" do
        patch :update, params: { id: course.id, course: { name: nil } }
        expect(course.reload.name).not_to eq(nil)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the course and returns a successful JSON response" do
      course_to_destroy = create(:course)
      expect {
        delete :destroy, params: { id: course_to_destroy.id }
      }.to change(Course, :count).by(-1)

      expect(response).to have_http_status(:ok)
      expect(response.content_type).to eq("application/json; charset=utf-8")
    end
  end
end
