require 'spec_helper'

RSpec.describe UserGroup, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:group) { FactoryBot.create(:group) }

  it "es válido con atributos válidos" do
    user_group = build(:user_group, user: user, group: group)
    expect(user_group).to be_valid
  end


  it "es inválido sin un user_id" do
    user_group = UserGroup.new(group_id: group.id, user_id: nil)
    expect(user_group).not_to be_valid
  end

  it "es inválido sin un group_id" do
    user_group = UserGroup.new(group_id: nil, user_id: user.id)
    expect(user_group).not_to be_valid
  end
end
