import React from 'react'
import {connect} from 'react-redux'
import CardList from './CardList'

const mapStateToProps = ({filters}) => ({
  category: filters.category || null
})

export default connect(mapStateToProps)(CardList)
