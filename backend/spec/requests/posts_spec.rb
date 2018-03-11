require 'rails_helper'
require_relative 'jsonapi_request'
require_relative 'request_authorization'

RSpec.describe 'Posts', type: :request do
  include_context 'of an JSONAPI.org request'
  include Docs::Posts::Api

  let(:test_post) { create :post }

  let(:valid_create_params) { { type: 'post', attributes: attributes_for(:post) } }
  let(:valid_update_params) { { type: 'post', attributes: { body: 'Updated Body' } } }
  let(:invalid_params) { { type: 'post', attributes: { body: '' } } }

  describe 'GET /posts' do
    include Docs::Posts::Index

    before { expect(test_post).to be_persisted }

    it 'serves a list of posts', :dox do
      get posts_path, headers: test_request_headers
      expect(response).to have_http_status :ok
      expect(response.content_type).to eq 'application/vnd.api+json'
      assert_payload :post, test_post, json_items(0)
    end
  end

  describe 'GET /posts/:id' do
    include Docs::Posts::Show

    before { expect(test_post).to be_persisted }

    it 'serves the requested post', :dox do
      get post_path(test_post), headers: test_request_headers
      expect(response).to have_http_status :ok
      expect(response.content_type).to eq 'application/vnd.api+json'
      assert_payload :post, test_post, json_item
    end
  end

  describe 'POST /posts' do
    include_context 'of an authorized JSONAPI.org request'
    # include resource module
    # include Docs::Posts::Create
    let(:create_params) { { data: valid_create_params }.to_json }

    it 'creates a new post' do
      expect { post posts_path, params: create_params, headers: test_request_headers }
        .to change(Post, :count).by 1

      expect(response).to have_http_status :created
      expect(response.content_type).to eq 'application/vnd.api+json'
      created_post = Post.last
      assert_payload :post, created_post, json_item
    end

    context 'without a valid access token' do
      let(:test_request_headers) { jsonapi_request_headers }

      it "fails with an 'unauthorized' status" do
        expect { post posts_path, params: create_params, headers: test_request_headers }
          .not_to change(Post, :count)

        expect(response).to have_http_status :unauthorized
      end
    end

    context 'with invalid parameters' do
      let(:create_params) { { data: invalid_params }.to_json }

      it "fails with an 'unprocessable entity' status" do
        expect { post posts_path, params: create_params, headers: test_request_headers }
          .not_to change(Post, :count)

        expect(response).to have_http_status :unprocessable_entity
        expect(validation_errors).to include body: a_string_ending_with("can't be blank")
      end
    end
  end

  describe 'PATCH /posts/:id' do
    include_context 'of an authorized JSONAPI.org request'
    let(:test_post) { create :post, author: test_request_resource_owner }
    before { expect(test_post).to be_persisted }

    # include resource module
    # include Docs::Posts::Update
    let(:update_params) { { data: valid_update_params }.to_json }


    it 'updates the existing post' do
      expect {
        patch post_path(test_post), params: update_params, headers: test_request_headers
      }.to change { test_post.reload.body }.to 'Updated Body'

      expect(response).to have_http_status :ok
      expect(response.content_type).to eq 'application/vnd.api+json'
      assert_payload :post, test_post, json_item
    end

    context 'without a valid access token' do
      let(:test_request_headers) { jsonapi_request_headers }

      it "fails with an 'unauthorized' status" do
        expect {
          patch post_path(test_post), params: update_params, headers: test_request_headers
        }.not_to change(Post, :count)

        expect(response).to have_http_status :unauthorized

      end
    end

    context 'with invalid parameters' do
      let(:update_params) { { data: invalid_params }.to_json }

      it "fails with an 'unprocessable entity' status" do
        expect {
          patch post_path(test_post), params: update_params, headers: test_request_headers
        }.not_to change { test_post.reload.body }

        expect(response).to have_http_status :unprocessable_entity
        expect(validation_errors).to include body: a_string_ending_with("can't be blank")
      end
    end

    context 'as a user other than the author' do
      let(:test_post) { create :post }

      it "fails with a 'forbidden' status" do
        expect {
          patch post_path(test_post), params: update_params, headers: test_request_headers
        }.not_to change { test_post.reload.body }

        expect(response).to have_http_status :forbidden
      end
    end
  end

  describe 'DELETE /posts/:id' do
    include_context 'of an authorized JSONAPI.org request'
    let(:test_post) { create :post, author: test_request_resource_owner }
    before { expect(test_post).to be_persisted }

    it 'destroys the post' do
      expect { delete post_path(test_post), headers: test_request_headers }
        .to change(Post, :count).by -1

      expect(response).to have_http_status :no_content
      expect(response.body).to be_blank
      expect(Post.exists?(test_post.id)).to eq false
    end

    context 'without a valid access token' do
      let(:test_request_headers) { jsonapi_request_headers }

      it "fails with an 'unauthorized' status" do
        expect { delete post_path(test_post), headers: test_request_headers }
          .not_to change(Post, :count)

        expect(response).to have_http_status :unauthorized
        expect(Post.exists?(test_post.id)).to eq true
      end
    end

    context 'as a user other than the author' do
      let!(:test_post) { create :post }

      it "fails with a 'forbidden' status" do
        expect { delete post_path(test_post), headers: test_request_headers }
          .not_to change(Post, :count)

        expect(response).to have_http_status :forbidden
      end
    end
  end
end
