import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'infos', 'form', 'card' ]
  
  // when the controller initializes this runs
  connect() {
    // console.log('update movies controller is connected')
    // console.log('this is the infos')
    // console.log(this.infosTarget)
    // console.log('this is the form')
    // console.log(this.formTarget)
  }

  toggle = () => {
    this.infosTarget.classList.add('d-none')
    this.formTarget.classList.remove('d-none')
  }

  update = (event) => {
    event.preventDefault();
    const url = this.formTarget.action
    const options = {
      method: 'PATCH',
      headers: { 'Accept': 'text/plain' },
      body: new FormData(this.formTarget)
      // FormData.new()
    }

    fetch(url, options)
      .then(response => response.text())
      .then((responseHTML) => {
        // console.log(responseHTML);
        this.cardTarget.outerHTML = responseHTML;
      })

  }

}
