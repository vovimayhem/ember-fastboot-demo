# Configures Dox within RSpec:
RSpec.configure do |config|
  config.after(:each, :dox) do |example|
    example.metadata[:request] = request
    example.metadata[:response] = response
  end
end


Dir[Rails.root.join('docs/rest-api/**/*.rb')].each { |f| require f }

# Configures Dox:
Dox.configure do |config|
  config.header_file_path = Rails.root.join 'docs/rest-api/descriptions/header.md'
  config.desc_folder_path = Rails.root.join 'docs/rest-api/descriptions'
  config.headers_whitelist = %w[Accept Authorization]
end
