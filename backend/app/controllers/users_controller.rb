class UsersController < ApplicationApiController
  # GET /users
  def index
    @users, scope_size = scope_and_page_size_from User.all

    render jsonapi: @users, links: generate_page_links(:users_url, scope_size)
  end

  # GET /users/1
  def show
    @user = User.find(params[:id])
    render jsonapi: @user
  end

  protected

    def scope_and_page_size_from(initial_scope)
      scope = initial_scope
      size = scope.count

      [scope, size]
    end
end
