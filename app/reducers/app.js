import {combineReducers} from 'redux'
import filters from './filters'
import partners from './partners'
import popups from './popups'
import session from './session'
import auth from './auth'
import testimonials from './testimonials'
import preloader from './preloader'

const app = combineReducers({session, filters, partners, popups, auth, testimonials, preloader})

export default app
