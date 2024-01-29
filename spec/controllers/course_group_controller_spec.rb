require 'spec_helper'

RSpec.describe CourseGroupController, type: :controller do
  let(:user) { create(:user) }
  let(:course) { create(:course) }
  let(:group) { create(:group) }

  before do
    sign_in user
  end

  describe "POST #assign_group" do
    context "when course and group exist" do
      it "assigns the group to the course" do
        post :assign_group, params: { course_id: course.id, group_id: group.id }
        
        expect(response).to have_http_status(:success)

        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('Course was successfully assigned to the group.')
      end
    end

    context "when the group is already assigned to the course" do
      before do
        course.groups << group
      end

      it "returns a message indicating that the group is already assigned" do
        post :assign_group, params: { course_id: course.id, group_id: group.id }
        
        expect(response).to have_http_status(:success)

        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('El grupo ya está asignado a este curso.')
      end
    end

    context "when course and group exist" do
      it "assigns the group to the course" do
        post :assign_group, params: { course_id: course.id, group_id: group.id }
        
        expect(response).to have_http_status(:success)
        expect(response.body).to include('Course was successfully assigned to the group.')
      end
    end
  end
end