# spec/models/group_spec.rb

require 'spec_helper'
require 'rails_helper'

RSpec.describe Group, type: :model do
  
  it "es válido con atributos válidos" do
    group = Group.new(name: "Grupo A", quantity: 10)
    expect(group).to be_valid
  end

  it "es inválido sin un nombre" do
    group = Group.new(name: nil, quantity: 5)
    expect(group).not_to be_valid
  end

  it "es válido sin una cantidad, asigna la cantidad predeterminada" do
    group = Group.new(name: "Grupo B", quantity: nil)
    group.save
    expect(group).to be_valid
    expect(group.quantity).to eq(Group::DEFAULT_QUANTITY)
  end
  
  

  it "es inválido con una cantidad negativa" do
    group = Group.new(name: "Grupo C", quantity: -3)
    expect(group).not_to be_valid
  end

  it "es inválido con una cantidad no numérica" do
    group = Group.new(name: "Grupo D", quantity: "no es un número")
    expect(group).not_to be_valid
  end

  it "es inválido con un nombre duplicado" do
   group_2 = Group.create(name: "Grupo E", quantity: 8)
    group = Group.new(name: "Grupo E", quantity: 12)
    expect(group).not_to be_valid
  end

  it "asigna una cantidad predeterminada si no se proporciona" do
    group = Group.new(name: "Grupo F")
    group.save
    expect(group.quantity).to eq(Group::DEFAULT_QUANTITY)
  end
  

# Cambia
# Cambia
it "puede tener muchos usuarios asociados" do
  group = Group.create(name: "Grupo G", quantity: 2)
  user1 = User.new(first_name: "Usuario", last_name: "1", age: 25, state: "Activo", jti: "token1", email: "usuario1@example.com",password: "password123")
  user2 = User.new(first_name: "Usuario", last_name: "2", age: 30, state: "Inactivo", jti: "token2", email: "usuario2@example.com",password: "password456")

  group.users << [user1, user2]

  expect(group.users).to include(user1, user2)
end


end
