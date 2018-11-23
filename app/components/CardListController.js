import React from 'react'
import {connect} from 'react-redux'
import CardList from './CardList'
import queryString from 'query-string'

const directionFromURL = {
  '/mfo':'mfo',
  '/cards':'cards'
}

function sortResults(data, category) {
  return data.filter(function (el) {
    if(el.categories[category]) {
      return true
    } else {
      return false
    }
  }).sort(function(first, second){
    if (first.categories[category] < second.categories[category]) {
      return -1;
    }
    if (first.categories[category] > second.categories[category]) {
      return 1;
    }
    return 0;
  })
}

function selectCards(partners, category, url) {
  const direction = directionFromURL[url] ? directionFromURL[url] : 'mfo'
  if (category) {
    return sortResults(partners[direction].data, category)
  } else {
    return partners[direction].data
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

const mapStateToProps = ({session, filters, partners, auth}, {url}) => ({
  cards: selectCards(partners, filters.category || null, url),
  tail: makeTail(session),
  isLoggedIn: auth.token !== null
})

export default connect(mapStateToProps)(CardList)
