import React from 'react'
import {connect} from 'react-redux'
import CardList from './CardList'
import queryString from 'query-string'

const directionFromURL = {
  '/mfo':'mfo',
  '/cards':'cards'
}

function sortResults(ids, category, partners) {
  return ids.filter(function (id) {
    if(partners[id].categories[category]) {
      return true
    } else {
      return false
    }
  }).sort(function(first, second){
    if (partners[first].categories[category] < partners[second].categories[category]) {
      return -1;
    }
    if (partners[first].categories[category] > partners[second].categories[category]) {
      return 1;
    }
    return 0;
  })
}

function selectCards(partners, category, url) {
  const direction = directionFromURL[url] ? directionFromURL[url] : 'mfo'
  if (category) {
    return sortResults(partners[direction], category, partners.data)
  } else {
    return partners[direction]
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
  partners: partners.data,
  tail: makeTail(session),
  isLoggedIn: auth.token !== null
})

export default connect(mapStateToProps)(CardList)
