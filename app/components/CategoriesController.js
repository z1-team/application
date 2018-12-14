import React from 'react'
import {connect} from 'react-redux'
import Categories from './Categories'
import { withRouter } from "react-router"

const mapStateToProps = ({filters}) => ({filters})

export default withRouter(connect(mapStateToProps)(Categories))
