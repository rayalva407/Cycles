class AddColumnsToCycles < ActiveRecord::Migration[6.0]
  def change
    add_column :cycles, :length, :integer
    add_column :cycles, :fertile_window, :date
    add_column :cycles, :ovulation, :date
  end
end
