import React, {Component} from 'react'
import {connect} from 'react-redux'
import Masonry from 'react-masonry-component'

import {fetchTestimonials, sendTestimonial, deleteTestimonial} from '../actions'

import Testi from './Testi'
import LeaveTesti from './LeaveTesti'

const masonryOptions = {
    transitionDuration: 0
}

const imagesLoadedOptions = { background: '' }

const mapStateToProps = ({partners, testimonials, auth}) => ({
  partners: partners.data,
  testimonials,
  isLoggedIn: auth.token !== null
})

class Testimonials extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    const id = this.props.match.params.id

    window.scrollTo({
      top: 0
    })
    dispatch(fetchTestimonials('partner', id))
  }

  getEnding() {
    const { testimonials } = this.props
    const count = testimonials && testimonials.data.length
    const ending = count%10

    switch(ending) {
      case 1:
      case 2:
      case 3:
      case 4:
        return "отзыва"
      case 0:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      default:
        return "отзывов"
    }
  }

  handleSubmit = ({cardID, name, email, text, rating}) => {
    const {dispatch} = this.props
    dispatch(sendTestimonial({
      partner: cardID,
      name, email, text, rating
    }))
  }

  handleDelete = (id) => {
    const {dispatch} = this.props
    dispatch(deleteTestimonial(id))
  }

  render() {
    const id = this.props.match.params.id
    const { partners, testimonials, dispatch, isLoggedIn } = this.props
    const partner = partners[id]
    const rating = partner && Math.round(partner.sortBy.rating*10)/10
    const star = partner && Math.round(partner.sortBy.rating*20)

    console.log(star)

    return (
      <div className="wr-testimonials">
        <div className="container">
          <div className="testimonials">
            <header>
              <h2>Отзывы кредита “{partner && partner.main.title}”
                <div className="rating">
                  <div className="star-rating">
                    <ul className="highlighted" style={{width: star + '%'}}>
                      <li><i className="fas fa-star"></i></li>
                      <li><i className="fas fa-star"></i></li>
                      <li><i className="fas fa-star"></i></li>
                      <li><i className="fas fa-star"></i></li>
                      <li><i className="fas fa-star"></i></li>
                    </ul>
                    <ul>
                      <li><i className="fas fa-star"></i></li>
                      <li><i className="fas fa-star"></i></li>
                      <li><i className="fas fa-star"></i></li>
                      <li><i className="fas fa-star"></i></li>
                      <li><i className="fas fa-star"></i></li>
                    </ul>
                  </div>
                  <p>{testimonials.data.length} {this.getEnding()}</p>
                  {partner && partner.sortBy && partner.sortBy.rating && <span>({rating} из 5)</span>}
                </div>
              </h2>
              <figure>
                <img src={partner && partner.main.logo}/>
              </figure>
            </header>
            {testimonials.data.length ?
              <Masonry className="masonry">
                {testimonials.data.map((item) => (
                  <Testi key={item.id} testiID={item.id} text={item.text} user={item.name} rating={item.rating} isLoggedIn={isLoggedIn} onDelete={this.handleDelete} />
                ))}
              </Masonry>
             : <h3>Отзывов пока нет.</h3>
            }
            <LeaveTesti id={id} onSubmit={this.handleSubmit} dispatch={dispatch}/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Testimonials)
