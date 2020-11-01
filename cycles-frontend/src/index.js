const BACKEND_URL = 'http://localhost:3000';
const TRACKERS_URL = `${BACKEND_URL}/trackers`
const CYCLES_URL = `${BACKEND_URL}/cycles`
const trackerForm = document.querySelector("#create-tracker-form")
const cycleForm = document.createElement('form')
let tracker;
let cycle;
cycleForm.setAttribute("id", "cycle-startdate-form")
cycleForm.innerHTML = "<label for='new-cycle'>Enter your last period's start date:</label><input type='date' id='new-cycle' name='new-cycle'><input type='submit' value='Submit'>"

const trackerData = document.querySelector("#new-tracker-name")
let cycleData = document.querySelector("#new-cycle")
const welcomeDiv = document.querySelector("#welcome-div")
const cycleCardDiv = document.querySelector("#cycle-card-div")

function welcomeShow(object) {
  const welcomeMessage = document.createElement('h1')
  welcomeMessage.innerText = `Welcome ${object.name}!`
  trackerForm.remove()
  welcomeDiv.appendChild(welcomeMessage)
  welcomeDiv.appendChild(cycleForm)
  cycleData = document.querySelector("#new-cycle")
}

function calculateLength(date1) {
  const oneDay = 24 * 60 * 60 * 1000;
  const recentDate = new Date(date1);
  const lastDate = new Date(document.querySelector("#cycle-card-div").lastElementChild.previousSibling.firstElementChild.innerText.slice(-10));

  const result = Math.round(Math.abs((recentDate - lastDate) / oneDay))
  return result
}

function dateFormat(string) {
  let split = string.split("-")
  date = `${split[1]}-${split[2]}-${split[0]}`
  return date
}

function renderCycle(object) {
  const renderDateDiv = document.createElement('div')
  renderDateDiv.setAttribute("class", "cycle-card")
  renderDateDiv.innerHTML = `<p>Cycle Start Date: ${dateFormat(object.startdate)}<p> <p>Cycle Length: ${object.length}</p> <p>Fertile Window Starts: ${object.fertile_window}</p> <p>Ovulation Starts On: ${object.ovulation}`
  cycleCardDiv.appendChild(renderDateDiv)
}

function objectCycles(object) {
  object.cycles.forEach(element => renderCycle(element))
}

trackerForm.addEventListener('submit', function(e) {
  e.preventDefault()
  tracker = new Tracker(trackerData.value)
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
      objectCycles(object)
    })
    .catch(error => alert(error.message))
})

cycleForm.addEventListener('submit', function(e) {
  e.preventDefault()
  cycle = new Cycle(cycleData.value)


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
    .then(object => renderCycle(object))
    .catch(error => alert(error.message))
})