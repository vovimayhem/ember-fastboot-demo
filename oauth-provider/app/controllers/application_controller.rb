class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def after_sign_in_path_for(resource_or_scope)
    return session.delete(:after_sign_in_path) if session[:after_sign_in_path].present?
    super
  end

  def after_sign_out_path_for(resource_or_scope)
    return session.delete(:after_sign_out_path) if session[:after_sign_out_path].present?
    redirect_uri_on_params = params[:redirect_uri]
    return redirect_uri_on_params if redirect_uri_on_params.present?
    super
  end
end
