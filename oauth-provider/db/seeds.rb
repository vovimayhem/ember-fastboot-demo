# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
demo_user_password = ENV.fetch 'DEMO_USER_PASSWORD', '123456'
demo_app_user = User.create_with(
  first_name: 'Demo',
  last_name: 'User',
  password: demo_user_password,
  password_confirmation: demo_user_password
).find_or_create_by email: ENV.fetch('DEMO_USER_EMAIL', 'demo@example.com')

demo_app_create_attributes = {
  uid: ENV.fetch('DEMO_API_KEY', 'cb6469c69024696907215d7f3bedcc7880a5de16833945639d81b48b8d98a098'),
  redirect_uri: 'http://localhost:4200/auth/directory/callback',
  trusted: true,
  owner: demo_app_user
}
demo_api_secret = ENV['DEMO_API_SECRET']
demo_app_create_attributes[:secret] = demo_api_secret if demo_api_secret.present?
Doorkeeper::Application.create_with(demo_app_create_attributes).find_or_create_by name: 'Demo App'
