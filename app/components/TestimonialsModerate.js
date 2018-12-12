import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import TestiModerate from './TestiModerate'
import {publicTestimonial, deleteTestimonial, fetchTestimonials} from '../actions'

const masonryOptions = {
    transitionDuration: 0
}

const imagesLoadedOptions = { background: '' }

const mapStateToProps = ({auth, testimonials}) => ({
  isLoggedIn: auth.token !== null,
  testimonials
})

class TestimonialsModerate extends Component {
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(fetchTestimonials('unpublished'))
  }

  handlePublic = (item) => {
    const {dispatch} = this.props
    dispatch(publicTestimonial({...item, status: 'published'}))
  }

  handleDelete = (id) => {
    const {dispatch} = this.props
    dispatch(deleteTestimonial(id))
  }

  render() {
    const { testimonials, isLoggedIn } = this.props
    if(!isLoggedIn) {
      return (
        <Redirect exact from="/moderate" to={{ pathname: '/mfo' }}/>
      )
    }

    console.log(testimonials.data.length)

    return (
      <div className="wr-testimonials">
        <div className="container">
          <div className="testimonials moderate">
            {!testimonials.data.length && <h2>Нет отзывов для модерации.</h2>}
            {testimonials.data.map((item) => (
              <TestiModerate
                key={item.id}
                item={item}
                text={item.text}
                user={item.name}
                rating={item.rating}
                onDelete={this.handleDelete}
                onPublic={this.handlePublic}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(TestimonialsModerate)
