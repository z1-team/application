import React, {Component} from 'react'

class RangeInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isMoving: false,
      position: 0,
      value: props.start
    }
  }

  calcValue(event) {
    const {start, end, step} = this.props
    const elemWidth = this.range.clientWidth
    const left =  event.clientX - this.range.getBoundingClientRect().left
    const position = Math.max(0, Math.min(1, left / elemWidth))
    const value = Math.round((start + (end-start)*position)/step)*step

    return {position: (value - start)/(end-start), value}
  }

  handleStart = (event) => {
    const { position, value } = this.calcValue(event)

    this.setState({isMoving: true, position, value})
  }

  handleEnd = (event) => {
    const { name, onChange } = this.props

    this.setState({isMoving: false})

    if(typeof onChange === 'function') {
      onChange(name, this.state.value)
    }
  }

  handleMove = (event) => {
    const { isMoving } = this.state

    if(isMoving) {
      const { position, value } = this.calcValue(event)
      this.setState({position, value})
    }
  }

  handleChange = (event) => {
    const parsed = parseInt(event.target.value)
    const value = parsed >= 0 || parsed < 0 ? parsed : 0
    const {start, end, step, name, onChange} = this.props
    const correct = Math.max(start, Math.min(end, value))
    const round = Math.round(correct/step)*step
    const position = (round - start)/(end-start)

    this.setState({position, value: Math.min(end, value)})

    if(typeof onChange === 'function') {
      onChange(name, correct)
    }
  }

  render() {
    const { position, value } = this.state
      const { label } = this.props

    return(
      <div className="range-input">
          <div>
            <input type="text" value={value} onChange={this.handleChange}/>
            <div ref={ref => this.range = ref} onMouseDown={this.handleStart} onMouseUp={this.handleEnd} onMouseMove={this.handleMove} onMouseLeave={this.handleEnd} >
              <span className="line"></span>
              <span className="point" style={{left: 100*position + '%'}}></span>
            </div>
          </div>
          <p>{label}</p>
      </div>
    )
  }
}

export default RangeInput
