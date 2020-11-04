class CyclesController < ApplicationController
  def index
    cycles = Cycle.all
    render json: cycles, except: [:created_at, :updated_at]
  end

  def new
    cycle = Cycle.new
  end

  def create
    cycle = Cycle.new(cycle_params)
    if cycle.save
      render json: cycle, except: [:created_at, :updated_at]
    else
      render json: {message: "Error"}
    end
  end

  def destroy
    cycle = Cycle.find(params[:id])
    binding.pry
    cycle.destroy
  end

  private

    def cycle_params
      params.require(:cycle).permit(:startdate, :tracker_id, :length, :expected_cycle, :ovulation, :fertile_window)
    end

end
