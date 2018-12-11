import React, {Component} from 'react'

import LeaveRating from './LeaveRating'

class LeaveTesti extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cardID: props.id,
      name: '',
      email: '',
      text: '',
      rating: 0
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    this.setState({[name]: value})
  }

  handleRating = (value) => {
    this.setState({rating: value})
  }

  handleSubmit = (event) => {
    event.preventDefault()

    console.log(this.state)
    this.setState({rating: 0})
  }

  render() {
    const { rating } = this.state

    return (
      <div className="leave-testi">
        <h2>Оставьте свой отзыв</h2>
        <form action="#" onSubmit={this.handleSubmit}>
          <section>
            <div className="form-input">
              <label>Ваше имя</label>
              <input type="text" name="name" onChange={this.handleChange}/>
            </div>
            <div className="form-input">
              <label>Ваш e-mail</label>
              <input type="email" name="email" onChange={this.handleChange}/>
            </div>
            <div className="form-textarea">
              <label>Ваш отзыв</label>
              <textarea name="text" onChange={this.handleChange}></textarea>
            </div>
            <div className="form-input">
              <label>Ваша оценка</label>
              <LeaveRating onChange={this.handleRating} rating={rating} />
            </div>
          </section>
          <footer>
            <button>Отправить отзыв</button>
          </footer>
        </form>
      </div>
    )
  }
}

export default LeaveTesti
