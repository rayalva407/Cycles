# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Tracker.create(name: "Ana")
Tracker.create(name: "Jessie")
Tracker.create(name: "Beth")

Cycle.create(startdate: "09/08/2020", tracker_id: Tracker.all.sample.id)
Cycle.create(startdate: "08/09/2020", tracker_id: Tracker.all.sample.id)
Cycle.create(startdate: "07/12/2020", tracker_id: Tracker.all.sample.id)