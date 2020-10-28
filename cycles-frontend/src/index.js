const BACKEND_URL = 'http://localhost:3000';
const TRACKERS_URL = `${BACKEND_URL}/trackers`
const trackerForm = document.querySelector("#create-tracker-form")
const formData = document.querySelector("#new-tracker-name")
const welcomeDiv = document.querySelector("#welcome-div")

function welcomeShow(object) {
  const welcomeMessage = document.createElement('h2')
  welcomeMessage.innerText = `Welcome ${object.name}!`
  trackerForm.remove()
  welcomeDiv.appendChild(welcomeMessage)

}

trackerForm.addEventListener('submit', function(e) {
  e.preventDefault
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: formData.value
    })
  };

  fetch(TRACKERS_URL, configObj)
    .then(response => response.json())
    .then(object => welcomeShow(object))
    .catch(error => alert(error.message))
})