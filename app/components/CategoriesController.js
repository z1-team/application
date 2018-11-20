import React from 'react'
import {connect} from 'react-redux'
import Categories from './Categories'

const mapStateToProps = ({filters}) => ({
  categories: filters.categories || null
})

export default connect(mapStateToProps)(Categories)
