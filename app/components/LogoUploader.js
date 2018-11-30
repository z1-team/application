import React, {Component} from 'react'

class LogoUploader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      image: this.props.logo
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const {onChange} = this.props
    var reader = new FileReader()

    reader.addEventListener("load", (event) => {
      this.setState({image: event.target.result})

      if(typeof onChange === "function") {
        onChange("main", "logo", event.target.result)
      }
    })
    reader.readAsDataURL(this.fileUpload.files[0])
  }

  render() {
    return (
        <figure>
          <img src={this.state.image} />
          <figcaption>
            <label>
              <i className="fas fa-upload"></i>
              <input ref={ref => this.fileUpload = ref} type="file" accept="image/x-png,image/jpeg" onChange={this.handleChange}/>
            </label>
          </figcaption>
        </figure>
    )
  }
}

export default LogoUploader
