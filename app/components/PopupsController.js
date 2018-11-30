import React from 'react'
import {connect} from 'react-redux'
import Popups from './Popups'

const mapStateToProps = ({popups, partners, auth}) => ({
  popups,
  partner: partners.data[partners.selected],
  error: auth.error
})

export default connect(mapStateToProps)(Popups)
