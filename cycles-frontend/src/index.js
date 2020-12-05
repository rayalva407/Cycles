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

// function dateFormat(string) {
//   let split = string.split("-")
//   date = `${split[1]}-${split[2]}-${split[0]}`
//   return date
// }

const dateFormat = string => {
  let split = string.split("-")
  date = `${split[1]}-${split[2]}-${split[0]}`
  return date
}

const daysDifference = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  const difference = Math.round(Math.abs((firstDate - secondDate) / oneDay));

  return difference;
}

const renderCycle = object => {
  const renderDateDiv = document.createElement('div')
  renderDateDiv.setAttribute("class", "cycle-card")
  renderDateDiv.innerHTML = `<p>Cycle Start Date: ${dateFormat(object.startdate)}</p> <p>Cycle Length: ${object.length}</p> <p>Next Cycle Start Date: ${dateFormat(object.expected_cycle)}</p> <p>Ovulation Starts On: ${dateFormat(object.ovulation)}</p> <p>Your Fertile Window Starts On: ${dateFormat(object.fertile_window)}</p> <button data-id="${object.id}" class="delete-btn">DELETE</button>`
  cycleCardDiv.appendChild(renderDateDiv)
}

const objectCycles = object => {
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
      tracker.render()
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
      tracker_id: tracker.id,
      length: cycle.length,
      expected_cycle: cycle.expected_cycle,
      ovulation: cycle.ovulation,
      fertile_window: cycle.fertile_window
    })
  };

  fetch(CYCLES_URL, configObj)
    .then(response => response.json())
    .then(object => renderCycle(object))
    .catch(error => alert(error.message))
})

cycleCardDiv.addEventListener("click", (e) => {
  if (e.target.className === "delete-btn") {
    fetch(`${CYCLES_URL}/${e.target.dataset.id}`, {
      method: "DELETE"
    })
    .then(r => {
      e.target.parentElement.remove()
    })
  }
})