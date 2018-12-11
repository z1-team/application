import React, {Component} from 'react'

class LeaveRating extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: 0,
      isHover: false
    }
  }

  handleClick = (event) => {
    const value = parseInt(event.target.getAttribute('data-value'))
    const { onChange } = this.props

    if(typeof onChange === 'function') {
      onChange(value)
    }
  }

  handleMove = (event) => {
    const value = parseInt(event.target.getAttribute('data-value'))

    this.setState({hover: value, isHover: true})
  }

  handleLeave = () => {
    this.setState({isHover: false})
  }

  selectValue() {
    const { hover, isHover } = this.state
    const { rating } = this.props

    return isHover ? hover : rating
  }

  render() {
    const value = this.selectValue()
    return (
      <ul className={`leave-rate rate-${value}`} onMouseLeave={this.handleLeave}>
        <li data-value="1" onClick={this.handleClick} onMouseEnter={this.handleMove}><i className="fas fa-star"></i></li>
        <li data-value="2" onClick={this.handleClick} onMouseEnter={this.handleMove}><i className="fas fa-star"></i></li>
        <li data-value="3" onClick={this.handleClick} onMouseEnter={this.handleMove}><i className="fas fa-star"></i></li>
        <li data-value="4" onClick={this.handleClick} onMouseEnter={this.handleMove}><i className="fas fa-star"></i></li>
        <li data-value="5" onClick={this.handleClick} onMouseEnter={this.handleMove}><i className="fas fa-star"></i></li>
      </ul>
    )
  }
}

export default LeaveRating
