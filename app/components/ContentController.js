import React, {Component} from 'react'
import {connect} from 'react-redux'
import CardList from './CardList'
import queryString from 'query-string'

import Sidebar from './Sidebar'
import Results from './Results'

const directionFromURL = {
  '/mfo':'mfo',
  '/cards':'cards'
}

function testFilter(filter, value) {
  if (filter.every(f => f === false)) {
    return true
  } else {
    return filter.some((f, i) => f && value[i])
  }
}

function testCategory(category, value) {
  return category === null ? true : value[category]
}

function filterResults(ids, partners, filters) {
  return ids.filter((id) => (
    Object.getOwnPropertyNames(filters).every(f => {
      if (f === 'category') {
        return testCategory(filters.category, partners[id].categories)
      } else if (partners[id].filters[f]) {
        return testFilter(filters[f], partners[id].filters[f])
      } else {
        return true
      }
    })
  ))
}

function selectCards(partners, filters, direction) {
  return filterResults(partners[direction], partners.data, filters)
}

function startAccumulation(filter) {
  return filter.map((value) => 0)
}

function applyFilter(ids, partners, value, filter) {
  return ids.filter(id => (
    testFilter(value, partners[id].filters[filter])
  ))
}

function makeCollections(ids, partners, filters) {
  if (ids.length > 0) {
    return Object.getOwnPropertyNames(partners[ids[0]].filters)
      .reduce((result, filter) => {
        result[filter] = applyFilter(ids, partners, filters[filter], filter)
        return result
      }, {})
  } else {
    return null
  }
}

function countIntersection(collections) {
  return collections ? Object.getOwnPropertyNames(collections)
    .reduce((rest, c) => {
      if (rest === 0) {
        return collections[c]
      } else {
        return rest.filter(id => collections[c].indexOf(id) !== -1)
      }
    }, 0).length : 0
}

function calcFilterActual(collections, ids, partners, filter, filters, index) {
  const test = filters[filter].map((value, i) => i === index ? true : value)
  return countIntersection({
    ...collections,
    [filter]: applyFilter(ids, partners, test, filter)
  })
}

function actualFilters(ids, partners, filters) {
  if (ids.length > 0) {
    const collections = makeCollections(ids, partners, filters)
    return Object.getOwnPropertyNames(partners[ids[0]].filters).reduce((result, filter) => {
      const actual = filters[filter].reduce((actual, value, index) => {
        const t = calcFilterActual(collections, ids, partners, filter, filters, index)
        actual[index] = t
        return actual
      }, startAccumulation(filters[filter]))
      result[filter] = actual
      return result
    }, {})
  } else {
    return {}
  }
}

function makeTail({query, user_id, client_id}) {
  const tail = {}
  if (query && user_id) {
    tail.user_id = user_id
    if (query.yclid) {
      tail.yclick_id = query.yclid
    }
    if (query.utm_campaign) {
      tail.utm_campaign = query.utm_campaign
    }
    if (client_id) {
      tail.client_id = client_id
    }
  }
  return queryString.stringify(tail)
}

const mapStateToProps = ({session, filters, partners, auth}, {url}) => {
  const direction = directionFromURL[url] ? directionFromURL[url] : 'mfo'
  const cards = selectCards(partners, filters, direction)
  return {
    cards,
    actual: actualFilters(partners[direction], partners.data, filters),
    partners: partners.data,
    tail: makeTail(session),
    isLoggedIn: auth.token !== null,
    filters,
    location: session.ip_info,
    currentPage: partners.currentPage
  }
}

class Main extends Component {
	render() {
		const {url, filters, cards, tail, isLoggedIn,
       partners, dispatch, location, currentPage, actual} = this.props
		return (
			<div className="wr-main">
				<div className="container">
					<div className="main">
						<Sidebar
              url={url}
              filters={filters}
              total={cards.length}
              dispatch={dispatch}
              location={location}
              actual={actual} />
						<Results
              url={url}
              tail={tail}
              partners={partners}
              cards={cards}
              isLoggedIn={isLoggedIn}
              dispatch={dispatch}
              currentPage={currentPage} />
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Main)
