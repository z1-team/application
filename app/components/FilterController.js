import React from 'react'
import {connect} from 'react-redux'
import Sidebar from './Sidebar'

const mapStateToProps = ({filters}) => ({ filters })

export default connect(mapStateToProps)(Sidebar)