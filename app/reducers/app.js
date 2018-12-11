import {combineReducers} from 'redux'
import filters from './filters'
import partners from './partners'
import popups from './popups'
import session from './session'
import auth from './auth'
import testimonials from './testimonials'

const app = combineReducers({session, filters, partners, popups, auth, testimonials})

export default app
