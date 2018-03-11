# = Oauth::ApplicationsController
#
# Overrides Doorkeeper::ApplicationsController to further manage the actions allowed over the
# registered OAuth applications
module Oauth
  class ApplicationsController < Doorkeeper::ApplicationsController
    before_action :authenticate_user!

    def index
      # @applications = current_user.oauth_applications
      @applications = Doorkeeper::Application.all
      respond_to do |format|
        format.html
        format.json { render json: @applications }
      end
    end

    # only needed if each application must have some owner
    def create
      @application = Doorkeeper::Application.new(application_params)
      @application.owner = current_user if Doorkeeper.configuration.confirm_application_owner?
      if @application.save
        flash[:notice] = I18n.t(:notice, scope: [:doorkeeper, :flash, :applications, :create])
        return redirect_to oauth_application_url(@application)
      end
      render :new
    end

    private

      def set_application
        # @application = current_user.oauth_applications.find(params[:id])
        @application = Doorkeeper::Application.find(params[:id])
      end
  end
end
