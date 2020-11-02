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

function dateFormat(string) {
  let split = string.split("-")
  date = `${split[1]}-${split[2]}-${split[0]}`
  return date
}

function daysDifference(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  const difference = Math.round(Math.abs((firstDate - secondDate) / oneDay));

  return difference;
}

function getAverageLength(object) {

  let cardDiv = document.querySelector('#cycle-card-div')
  if (cardDiv.childElementCount === 0) {
    return 28;
  }
  else {
    let total = 0;
    debugger;
    const children = cardDiv.children;
    const firstDate = cardDiv.lastElementChild.firstElementChild.innerText.slice(-10)
    const secondDate = dateFormat(object.startdate)
    const diff = daysDifference(firstDate, secondDate)

    for (let i = 0; i < children.length; i++) {
      const cycleCard = children[i];
      const num = cycleCard.firstElementChild.nextElementSibling.innerText.slice(-2)
      total += parseInt(num)
    }
    return Math.round((total + diff) / (children.length + 1))
  }

}

function dateAddition(date, days) {
  let result = new Date(date);
  debugger;
  if (!cycleCardDiv.hasChildNodes()) {
    days = 28
    result.setDate(result.getDate() + days);
    return result;
  }
  else {
    result.setDate(result.getDate() + days);
    return result;

  }
}

function renderCycle(object) {
  const renderDateDiv = document.createElement('div')
  renderDateDiv.setAttribute("class", "cycle-card")
  renderDateDiv.innerHTML = `<p>Cycle Start Date: ${dateFormat(object.startdate)}</p> <p>Cycle Length: ${object.length}</p> <p>Next Cycle: ${dateFormat(object.expected_cycle)}</p> <p>Ovulation Starts On: ${dateFormat(object.ovulation)}</p>`
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
  debugger;
  cycle = new Cycle(cycleData.value)
  cycle.length = getAverageLength(cycle)
  cycle.expected_cycle = dateAddition(cycle.startdate, cycle.length)
  cycle.ovulation = dateAddition(cycle.startdate, 14)

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
      ovulation: cycle.ovulation
    })
  };

  fetch(CYCLES_URL, configObj)
    .then(response => response.json())
    .then(object => renderCycle(object))
    .catch(error => alert(error.message))
})