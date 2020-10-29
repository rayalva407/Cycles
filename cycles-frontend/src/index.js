const BACKEND_URL = 'http://localhost:3000';
const TRACKERS_URL = `${BACKEND_URL}/trackers`
const trackerForm = document.querySelector("#create-tracker-form")
const cycleForm = document.createElement('form')
cycleForm.setAttribute("id", "cycle-startdate-form")
cycleForm.innerHTML = "<label for='new-cycle'>Enter your last period's start date:</label><input type='date' id='new-cycle' name='new-cycle'><input type='submit' value='Submit'>"
const trackerData = document.querySelector("#new-tracker-name")
const cycleData = document.querySelector("#new-cycle")
const welcomeDiv = document.querySelector("#welcome-div")


function welcomeShow(object) {
  const welcomeMessage = document.createElement('h2')
  welcomeMessage.innerText = `Welcome ${object.name}!`
  trackerForm.remove()
  welcomeDiv.appendChild(welcomeMessage)
  welcomeDiv.appendChild(cycleForm)
}

trackerForm.addEventListener('submit', function(e) {
  console.log(e)
  e.preventDefault()
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: trackerData.value
    })
  };

  fetch(TRACKERS_URL, configObj)
    .then(response => response.json())
    .then(object => welcomeShow(object))
    .catch(error => alert(error.message))
})

cycleForm.addEventListener('submit', function(e) {
  e.preventDefault()
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      startdate: newCycle.value
    })
  };

  
})