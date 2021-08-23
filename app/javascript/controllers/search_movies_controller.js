import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "input", "list", 'form' ]
  
  // when the controller initializes this runs
  connect() {
    // console.log(this.inputTarget)
    // console.log(this.listTarget)
    console.log(this.formTarget)
    console.log(this.formTarget.action)
  }

  update = (event) => {
    // console.log(this.inputTarget.value);
    const searchedMovie = this.inputTarget.value
    
    // base url = http://localhost:3000/movies (or smth else dynamically)
    const baseURL = this.formTarget.action

    const url = `${baseURL}?query=${searchedMovie}`
    const options = {
      headers: {
        'Accept': 'text/plain'
      }
    }

    fetch(url, options)
      .then(res => res.text())
      .then((moviesHTML) => {
        // console.log(moviesHTML)
        this.listTarget.outerHTML = moviesHTML;
      });
  }
}
