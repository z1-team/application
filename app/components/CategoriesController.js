import React from 'react'
import {connect} from 'react-redux'
import Categories from './Categories'
import { withRouter } from "react-router"

const mapStateToProps = ({filters}) => ({
  categories: filters.categories || null
})

export default withRouter(connect(mapStateToProps)(Categories))
