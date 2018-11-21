import {combineReducers} from 'redux'
import filters from './filters'
import partners from './partners'
import popups from './popups'
import session from './session'

const app = combineReducers({session, filters, partners, popups})

export default app
