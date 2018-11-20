import React from 'react'
import {connect} from 'react-redux'
import CardList from './CardList'

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

const mapStateToProps = ({filters, partners}, {url}) => ({
  cards: selectCards(partners, filters.category || null, url)
})

export default connect(mapStateToProps)(CardList)
