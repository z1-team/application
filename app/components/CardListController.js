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
    return partners[id].categories[category]
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
