class Tracker {
  constructor(name) {
    this.name = name;
  }

  render() {
    const welcomeMessage = document.createElement('h1')
    welcomeMessage.innerText = `Welcome ${this.name}!`
    trackerForm.remove()
    welcomeDiv.appendChild(welcomeMessage)
    welcomeDiv.appendChild(cycleForm)
    cycleData = document.querySelector("#new-cycle")
  }
}