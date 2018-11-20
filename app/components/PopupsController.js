import React from 'react'
import {connect} from 'react-redux'
import Popups from './Popups'

const mapStateToProps = ({popups}) => ({
  popups: popups.categories || false
})

export default connect(mapStateToProps)(Popups)