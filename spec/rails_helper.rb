# En el archivo rails_helper.rb
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)
require 'rspec/rails'
require 'factory_bot_rails'
Dir[Rails.root.join('spec', 'support', '**', '*.rb')].sort.each { |f| require f }

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
  config.infer_spec_type_from_file_location!
  config.use_transactional_fixtures = true
  config.include Devise::Test::ControllerHelpers, type: :controller
end
