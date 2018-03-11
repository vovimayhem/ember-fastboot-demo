# = PageParams
# Extracts the jsonapi.org `page` parameter and makes it available in controllers and views as the
# `page_params` helper method. See http://jsonapi.org/format/#fetching-pagination
module PageParams
  # Extracts pagination parameters from the request parameters:
  def page_params
    request.env['jsonapi.page_params'] ||= begin
      limit = (params.dig(:page, :limit) || 100).to_i
      limit = 1 if limit < 1
      limit = 500 if limit > 500
      ActionController::Parameters.new(limit: limit, offset: (params.dig(:page, :offset) || 0).to_i)
                                  .permit!
    end
  end

  def generate_page_links(url_helper, scope_size)
    { first: send(url_helper, jsonapi_params.merge(page: first_page_params)) }
      .merge(prev_page_link_hash(url_helper, scope_size))
      .merge(self: request.url)
      .merge(next_page_link_hash(url_helper, scope_size))
      .merge last: send(url_helper, jsonapi_params.merge(page: last_page_params(scope_size)))
  end

  def jsonapi_params
    request.env['jsonapi.params'] ||= params.slice(:sort, :fields, :filter, :include, :page).permit!
  end

  def prev_page?(scope_size)
    page_params[:offset] > 0
  end

  def next_page?(scope_size)
    page_params[:limit] + page_params[:offset] < scope_size
  end

  def first_page_params
    page_params.merge offset: 0
  end

  def prev_page_params(scope_size)
    return {} unless prev_page?(scope_size)
    prev_page_offset = page_params[:offset] + page_params[:limit]
    page_params.merge offset: prev_page_offset
  end

  def prev_page_link_hash(url_helper, scope_size)
    return {} unless prev_page?(scope_size)
    { prev: send(url_helper, jsonapi_params.merge(page: prev_page_params(scope_size))) }
  end

  def next_page_params(scope_size)
    return {} unless next_page?(scope_size)
    next_page_offset = page_params[:offset] + page_params[:limit]
    page_params.merge offset: next_page_offset
  end

  def next_page_link_hash(url_helper, scope_size)
    return {} unless next_page?(scope_size)
    { next: send(url_helper, jsonapi_params.merge(page: next_page_params(scope_size))) }
  end

  def last_page_params(scope_size)
    last_page_offset = (scope_size.to_i / page_params[:limit]) * page_params[:limit]
    page_params.merge offset: last_page_offset
  end
end
