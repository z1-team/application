import React, {Component} from 'react'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { 
	faFacebookF,
	faTwitter,
	faGooglePlusG,
	faPinterestP
} from '@fortawesome/free-brands-svg-icons'

library.add(
	faPhone,
	faFacebookF,
	faTwitter,
	faGooglePlusG,
	faPinterestP
)