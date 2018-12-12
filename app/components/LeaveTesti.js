import React, {Component} from 'react'

import LeaveRating from './LeaveRating'

import {openPopup} from '../actions'

const initialState = {
  name: '',
  email: '',
  text: '',
  rating: 0,
  isEditing: {
    name: false,
    email: false,
    text: false,
    rating: false
  }
}

class LeaveTesti extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ...initialState,
      cardID: props.id
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    this.setState(prev => ({
      [name]: value,
      isEditing: {
        ...prev.isEditing,
        [name]: true
      }
    }))
  }

  handleRating = (value) => {
    this.setState({rating: value})
  }

  handleSubmit = (event) => {
    const { name, email, text, rating } = this.state
    const { onSubmit, dispatch } = this.props

    event.preventDefault()

    if(name && email && text && rating !== 0) {
      if (typeof onSubmit === 'function') {
        onSubmit(this.state)
      }

      this.setState(initialState)
      dispatch(openPopup('testi'))
    } else {
      this.setState(prev => ({
        isEditing: {
          name: !prev.name,
          email: !prev.email,
          text: !prev.text,
          rating: !prev.rating
        }
      }))
    }
  }

  render() {
    const { name, email, text, rating, isEditing } = this.state

    return (
      <div className="leave-testi">
        <h2>Оставьте свой отзыв</h2>
        <form action="#" onSubmit={this.handleSubmit}>
          <section>
            <div className="form-input">
              <label>Ваше имя</label>
              <input type="text" name="name" value={name} onChange={this.handleChange}/>
              {isEditing.name && !name && <p>Пожалуйста, заполните поле.</p>}
            </div>
            <div className="form-input">
              <label>Ваш e-mail</label>
              <input type="email" name="email" value={email} onChange={this.handleChange}/>
              {isEditing.email && !email && <p>Пожалуйста, заполните поле.</p>}
            </div>
            <div className="form-textarea">
              <label>Ваш отзыв</label>
              <textarea name="text" value={text} onChange={this.handleChange}></textarea>
              {isEditing.text && !text && <p>Пожалуйста, заполните поле.</p>}
            </div>
            <div className="form-input">
              <label>Ваша оценка</label>
              <LeaveRating onChange={this.handleRating} rating={rating} />
              {isEditing.rating && rating === 0 && <p>Пожалуйста, поставьте свою оценку.</p>}
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
