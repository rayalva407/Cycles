class CyclesController < ApplicationController
  def index
    cycles = Cycle.all
    render json: cycles, except: [:created_at, :updated_at]
  end

  def new
    cycle = Cycle.new
  end

  def create
    def create
      cycle = Cycle.new(cycle_params)
      if cycle.save
        render json: cycle, except: [:created_at, :updated_at]
      else
        render json: {message: "Error"}
      end
    end
  end

  private

    def cycle_params
      params.require(:cycle).permit(:startdate, :tracker_id)
    end

end
