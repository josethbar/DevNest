require 'spec_helper'

RSpec.describe UserSubject, type: :model do
  let!(:user) { create(:user) }
  let!(:subject) { create(:subject) }

  it "es válido con atributos válidos" do
    user_subject = build(:user_subject, user: user, subject: subject)
    expect(user_subject).to be_valid
  end

  it "permite la asociación de un archivo" do
    user_subject = create(:user_subject, user: user, subject: subject)

    # Crea un archivo temporal en el mismo directorio
    file_path = Rails.root.join('test', 'fixtures', 'files', 'holi.txt')
    user_subject.file.attach(io: File.open(file_path), filename: 'holi.txt', content_type: 'text/plain')

    expect(user_subject.file).to be_attached
  end
end
