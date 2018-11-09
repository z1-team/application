import React, {Component} from 'react'

import Main from './Main'
import AboutProject from './AboutProject'
import Confidentiality from './Confidentiality'

class Content extends Component {

	getContent() {
		const url = this.props.match.params.id

		switch(url) {
			case "about":
				return <AboutProject />
			case "confidentiality":
				return <Confidentiality />
			default: 
				return <Main />
		}
	}

	render() {
		return this.getContent()
	}
}

export default Content