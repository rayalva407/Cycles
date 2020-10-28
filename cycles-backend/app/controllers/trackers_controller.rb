class TrackersController < ApplicationController
  def index
    trackers = Tracker.all
    render json: trackers
  end
end
