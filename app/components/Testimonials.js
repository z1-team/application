import React, {Component} from 'react'
import {connect} from 'react-redux'
import Masonry from 'react-masonry-component'

import {fetchTestimonials, sendTestimonial} from '../actions'

import Testi from './Testi'
import LeaveTesti from './LeaveTesti'

const masonryOptions = {
    transitionDuration: 0
}

const imagesLoadedOptions = { background: '' }

const mapStateToProps = ({partners, testimonials}) => ({
  partners: partners.data,
  testimonials
})

class Testimonials extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    const id = this.props.match.params.id

    dispatch(fetchTestimonials('partner', id))
  }

  handleSubmit = ({cardID, name, email, text, rating}) => {
    const {dispatch} = this.props
    dispatch(sendTestimonial({
      partner: cardID,
      name, email, text, rating
    }))
  }

  render() {
    const id = this.props.match.params.id
    const { partners, testimonials } = this.props
    const partner = partners[id]

    return (
      <div className="wr-testimonials">
        <div className="container">
          <div className="testimonials">
            <header>
              <h2>Отзывы кредита “{partner && partner.main.title}”
                <div className="rating">
                  <ul className="rate-4">
                    <li><i className="fas fa-star"></i></li>
                    <li><i className="fas fa-star"></i></li>
                    <li><i className="fas fa-star"></i></li>
                    <li><i className="fas fa-star"></i></li>
                    <li><i className="fas fa-star"></i></li>
                  </ul>
                  <p>22 отзыва</p>
                  {partner && partner.sort && <span>({partner.sort.rating} из 5)</span>}
                </div>
              </h2>
              <figure>
                <img src={partner && `/${partner.main.logo}`}/>
              </figure>
            </header>
            <Masonry className="masonry">
              {testimonials.data.map((item) => (
                <Testi key={item.id} text={item.text} user={item.name} rating={item.rating} />
              ))}
            </Masonry>
            <LeaveTesti id={id} onSubmit={this.handleSubmit}/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Testimonials)
