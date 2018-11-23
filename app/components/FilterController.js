import React from 'react'
import {connect} from 'react-redux'
import Sidebar from './Sidebar'

import { withRouter } from "react-router";

const mapStateToProps = ({filters}) => ({ filters })

export default withRouter(connect(mapStateToProps)(Sidebar))