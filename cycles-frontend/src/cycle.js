class Cycle {
  constructor(startdate) {
    this.id
    this.startdate = startdate
    this.length = this.getAverageLength()
    this.expected_cycle = this.dateAddition(this.startdate, this.length)
    this.fertile_window = this.dateAddition(this.startdate, 10)
    this.ovulation = this.dateAddition(this.startdate, 14)
  }

  getAverageLength() {
    let cardDiv = document.querySelector('#cycle-card-div')
    if (cardDiv.childElementCount === 0) {
      return 28;
    }
    else {
      let total = 0;
      const children = cardDiv.children;
      const firstDate = cardDiv.lastElementChild.firstElementChild.innerText.slice(-10)
      const secondDate = dateFormat(this.startdate)
      const diff = daysDifference(firstDate, secondDate)
  
      for (let i = 0; i < children.length; i++) {
        const cycleCard = children[i];
        const num = cycleCard.firstElementChild.nextElementSibling.innerText.slice(-2)
        total += parseInt(num)
      }
      return Math.round((total + diff) / (children.length + 1))
    }
  }

  dateAddition(date, days) {
    let result = new Date(date);
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

// render() {
//     const renderDateDiv = document.createElement('div')
//     renderDateDiv.setAttribute("class", "cycle-card")
//     renderDateDiv.innerHTML = `<p>Cycle Start Date: ${dateFormat(this.startdate)}</p> <p>Cycle Length: ${object.length}</p> <p>Next Cycle Start Date: ${dateFormat(this.expected_cycle)}</p> <p>Ovulation Starts On: ${dateFormat(this.ovulation)}</p> <p>Your Fertile Window Starts On: ${dateFormat(this.fertile_window)}</p>`
//     cycleCardDiv.appendChild(renderDateDiv)
//   }
}