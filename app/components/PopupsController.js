import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Popups from './Popups'

const mapStateToProps = ({popups, partners, auth}) => ({
  popups,
  partner: partners.data[partners.selected],
  error: auth.error
})

export default withRouter(connect(mapStateToProps)(Popups))
