class DeviseCreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users, id: :uuid do |t|
      t.string :first_name, null: false, comment: "This person's first name"
      t.string :last_name,  null: false, comment: "This person's last name"

      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
  end
end
