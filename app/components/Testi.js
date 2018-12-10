import React, {Component} from 'react'

class Testi extends Component {
  render() {
    const { text, user, rating } = this.props
    return(
      <div className="testi">
        <div>
          <i className="fas fa-quote-left"></i>
          <p>{text}</p>
          <i className="fas fa-quote-right"></i>
        </div>
        <footer>
          <p>{user}</p>
          <ul className={`rate-${rating}`}>
            <li><i className="fas fa-star"></i></li>
            <li><i className="fas fa-star"></i></li>
            <li><i className="fas fa-star"></i></li>
            <li><i className="fas fa-star"></i></li>
            <li><i className="fas fa-star"></i></li>
          </ul>
        </footer>
      </div>
    )
  }
}

export default Testi
