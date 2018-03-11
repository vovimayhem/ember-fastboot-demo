source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '2.4.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.5'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'

# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

gem 'doorkeeper', '~> 4.3', '>= 4.3.1'

# Flexible authentication solution for Rails with Warden
gem 'devise', '~> 4.4', '>= 4.4.1'

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors', '~> 1.0', '>= 1.0.2', require: 'rack/cors'

# Efficient, convenient, non-intrusive JSONAPI framework for Rails.
gem 'jsonapi-rails', '~> 0.3.1'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  gem 'pry-rails', '~> 0.3.6'
  gem 'rspec-rails', '~> 3.7', '>= 3.7.2'

  gem 'factory_bot_rails', '~> 4.8', '>= 4.8.2', require: false
  gem 'shoulda-matchers', '~> 3.1', '>= 3.1.2'
  gem 'database_cleaner', '~> 1.6', '>= 1.6.2', require: false

  # Run specs automatically:
  gem 'guard-rspec', '~> 4.7', '>= 4.7.3', require: false

  # Includes factory-style JSONAPI payload assertions:
  gem 'jsonapi_spec_helpers', '~> 0.4.7'

  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'spring-commands-rspec', '~> 1.0', '>= 1.0.4'
end

group :test do
  gem 'dox', '~> 1.1', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
