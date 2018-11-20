import {combineReducers} from 'redux'
import filters from './filters'
import partners from './partners'
import popups from './popups'

const app = combineReducers({filters, partners, popups})

export default app
