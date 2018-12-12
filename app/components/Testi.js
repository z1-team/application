import React, {Component} from 'react'

class Testi extends Component {

  handleDelete = (event) => {
    event.preventDefault()

    const { testiID, onDelete } = this.props

    if(typeof onDelete === 'function') {
      onDelete(testiID)
    }
  }

  render() {
    const { text, user, rating, isLoggedIn } = this.props
    return(
      <div className="testi">
        {isLoggedIn && <a href="#" className="delete-testi" onClick={this.handleDelete}><i className="fas fa-times"></i></a>}
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
