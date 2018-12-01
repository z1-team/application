import React, {Component} from 'react'

import { withRouter } from "react-router"

import ContentController from './ContentController'
import AboutProject from './AboutProject'
import Confidentiality from './Confidentiality'
import NotFound from './NotFound'

class Content extends Component {

	getContent() {
		const url = this.props.location.pathname

		switch(url) {
			case "/mfo":
			case "/cards":
				return <ContentController url={url} />
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
