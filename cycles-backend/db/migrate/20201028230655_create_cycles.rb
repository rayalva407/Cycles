class CreateCycles < ActiveRecord::Migration[6.0]
  def change
    create_table :cycles do |t|
      t.date :startdate
      t.references :tracker, null: false, foreign_key: true

      t.timestamps
    end
  end
end
