class TrackersController < ApplicationController
  def index
    trackers = Tracker.all
    render json: trackers
  end

  def new
    tracker = Tracker.new
  end

  def create
    tracker = Tracker.new(tracker_params)
    if tracker.save
      render json: tracker, except: [:created_at, :updated_at]
    else
      render json: {message: "Only letters"}
    end
  end

  private

    def tracker_params
      params.require(:tracker).permit(:name)
    end
end
