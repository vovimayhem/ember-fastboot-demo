# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
demo_api_key = ENV.fetch('DEMO_API_KEY', '3c8466708b1438f03825764d1efa0077b830667bb6fa17ff75104c1a6b8fb528')
demo_api_secret = ENV['DEMO_API_SECRET']
demo_app_create_attributes = {
  uid: demo_api_key,
  redirect_uri: ENV.fetch('DEMO_FRONTEND_AUTH_CALLBACKS', 'http://localhost:4200/auth/demo/callback'),
  trusted: true
}
demo_app_create_attributes[:secret] = demo_api_secret if demo_api_secret.present?
Doorkeeper::Application.create_with(demo_app_create_attributes).find_or_create_by name: 'Demo App'
