const BACKEND_URL = 'http://localhost:3000';
const TRACKERS_URL = `${BACKEND_URL}/trackers`
const CYCLES_URL = `${BACKEND_URL}/cycles`
const trackerForm = document.querySelector("#create-tracker-form")
const cycleForm = document.createElement('form')
let tracker
let cycle
cycleForm.setAttribute("id", "cycle-startdate-form")
cycleForm.innerHTML = "<label for='new-cycle'>Enter your last period's start date:</label><input type='date' id='new-cycle' name='new-cycle'><input type='submit' value='Submit'>"

const trackerData = document.querySelector("#new-tracker-name")
let cycleData = document.querySelector("#new-cycle")
const welcomeDiv = document.querySelector("#welcome-div")

function fetchTrackers() {
  fetch(TRACKERS_URL)
    .then(response => response.json())
    .then(object => object.forEach(element => trackers.push(element)))
    .catch(error => alert(error.message))
}

function fetchCycles() {
  fetch(CYCLES_URL)
    .then(response => response.json())
    .then(object => object.forEach(element => cycles.push(element)))
    .catch(error => alert(error.message))
}




function welcomeShow(object) {
  const welcomeMessage = document.createElement('h2')
  welcomeMessage.innerText = `Welcome ${object.name}!`
  trackerForm.remove()
  welcomeDiv.appendChild(welcomeMessage)
  welcomeDiv.appendChild(cycleForm)
  cycleData = document.querySelector("#new-cycle")
}

trackerForm.addEventListener('submit', function(e) {
  tracker = new Tracker(trackerData.value)
  e.preventDefault()
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: tracker.name
    })
  };

  fetch(TRACKERS_URL, configObj)
    .then(response => response.json())
    .then(function(object) {
      tracker.id = object.id
      welcomeShow(object)
    })
    .catch(error => alert(error.message))
})

cycleForm.addEventListener('submit', function(e) {
  e.preventDefault()
  cycle = new Cycle(cycleData.value)
  console.log(cycle.startdate, tracker.id)


  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      startdate: cycle.startdate,
      tracker_id: tracker.id
    })
  };

  fetch(CYCLES_URL, configObj)
    .then(response => response.json())
    .then(object => console.log(object))
    .catch(error => alert(error.message))
})