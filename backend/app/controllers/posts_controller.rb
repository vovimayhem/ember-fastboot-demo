class PostsController < ApplicationApiController
  deserializable_resource :post, class: DeserializablePost, only: [:create, :update]
  before_action :authorize_client!, only: [:create, :update, :destroy]

  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  def index
    @posts, scope_size = scope_and_page_size_from Post.all

    render jsonapi: @posts,
           include: include_params,
           links: generate_page_links(:posts_url, scope_size)
  end

  # GET /posts/1
  def show
    render jsonapi: @post
  end

  # POST /posts
  def create
    @post = Post.new post_params.merge author: current_user

    return render jsonapi: @post, status: :created if @post.save
    render jsonapi_errors: @post.errors, status: :unprocessable_entity
  end

  # PATCH/PUT /posts/1
  def update
    raise ActionErrors::Forbidden unless @post.author == current_user
    return render jsonapi: @post if @post.update(post_params)
    render jsonapi_errors: @post.errors, status: :unprocessable_entity
  end

  # DELETE /posts/1
  def destroy
    raise ActionErrors::Forbidden unless @post.author == current_user
    @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.require(:post).permit(:body)
    end

    def scope_and_page_size_from(initial_scope)
      scope = initial_scope
      size = scope.count

      scope = scope.includes(:author) if include_params.include? 'author'

      [scope, size]
    end
end
