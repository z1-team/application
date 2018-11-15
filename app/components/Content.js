import React, {Component} from 'react'

import { withRouter } from "react-router"

import Main from './Main'
import AboutProject from './AboutProject'
import Confidentiality from './Confidentiality'
import NotFound from './NotFound'

class Content extends Component {

	getContent() {
		const url = this.props.location.pathname
		const {category} = this.props

		switch(url) {
			case "/mfo":
				return <Main url={url} category={category} />
			case "/cards":
				return <Main url={url} category={category} />
			// case "/credits":
			// 	return <Main url={url} category={category} />
			case "/about":
				return <AboutProject />
			case "/confidentiality":
				return <Confidentiality />
			default: 
				return <NotFound />
		}
	}

	render() {
		return this.getContent()
	}
}

export default withRouter(Content)