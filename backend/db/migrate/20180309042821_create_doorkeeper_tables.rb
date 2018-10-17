class CreateDoorkeeperTables < ActiveRecord::Migration[5.2]
  def change
    create_table :oauth_applications, comment: 'Applications granted access to the system' do |t|
      t.string  :name,         null: false
      t.string  :uid,          null: false, index: { unique: true, name: :IX_oauth_application_uid }
      t.string  :secret,       null: false
      t.text    :redirect_uri, null: false
      t.string  :scopes,       null: false, default: ''
      t.boolean :trusted,      null: false, default: false
      t.boolean :confidential, null: false, default: true
      t.timestamps             null: false
    end

    create_table :oauth_access_grants, comment: 'Accesses granted' do |t|
      t.references :resource_owner, null: false, index: {
        name: :IX_oauth_access_grant_resource_owner
      }, foreign_key: { name: :FK_oauth_access_grant_resource_owner, to_table: :users }

      t.references :application, null: false, foreign_key: {
        name: :FK_oauth_access_grant_application,
        to_table: :oauth_applications
      }

      t.string :token, null: false, index: { unique: true, name: :UK_oauth_access_grant_token }

      t.integer  :expires_in,        null: false
      t.text     :redirect_uri,      null: false
      t.datetime :created_at,        null: false
      t.datetime :revoked_at
      t.string   :scopes
    end

    create_table :oauth_access_tokens, comment: 'Access tokens granted to users or apps' do |t|
      t.references :resource_owner, foreign_key: {
        name: :FK_oauth_access_grant_resource_owner, to_table: :users
      }

      t.references :application, foreign_key: {
        name: :FK_oauth_access_token_application, to_table: :oauth_applications
      }

      # If you use a custom token generator you may need to change this column
      # from string to text, so that it accepts tokens larger than 255
      # characters. More info on custom token generators in:
      # https://github.com/doorkeeper-gem/doorkeeper/tree/v3.0.0.rc1#custom-access-token-generator
      #
      # t.text     :token,             null: false
      t.string :token, null: false, index: { unique: true, name: :UK_oauth_access_token }

      t.string   :refresh_token, index: { name: :UK_oauth_access_refresh_token, unique: true }
      t.integer  :expires_in
      t.datetime :revoked_at
      t.datetime :created_at,             null: false
      t.string   :scopes

      # If there is a previous_refresh_token column,
      # refresh tokens will be revoked after a related access token is used.
      # If there is no previous_refresh_token column,
      # previous tokens are revoked as soon as a new access token is created.
      # Comment out this line if you'd rather have refresh tokens
      # instantly revoked.
      t.string   :previous_refresh_token, null: false, default: ""

      t.index [:application_id, :resource_owner_id],
              name: :IX_oauth_access_token_app_and_resource_owner
    end
  end
end
