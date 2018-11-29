import React from 'react'
import {connect} from 'react-redux'
import Popups from './Popups'

const mapStateToProps = ({popups, partners}) => ({
  popups,
  partner: partners.data[partners.selected]
})

export default connect(mapStateToProps)(Popups)
