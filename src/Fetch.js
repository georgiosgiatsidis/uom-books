export default class Fetch {
  constructor() {

  }

  get() {
    fetch("https://www.booknomads.com/api/v0/isbn/9789029538237")
      .then(res => res.json())
      .then(res => document.getElementById("book").innerHTML = JSON.stringify(res));
  }
}
