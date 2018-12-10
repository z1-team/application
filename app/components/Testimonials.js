import React, {Component} from 'react'
import {connect} from 'react-redux'
import Masonry from 'react-masonry-component'

import Testi from './Testi'
import LeaveTesti from './LeaveTesti'

const masonryOptions = {
    transitionDuration: 0
}

const imagesLoadedOptions = { background: '' }

const mapStateToProps = ({partners}) => ({
  partners: partners.data
})

const testi = [
  {
    id: 1,
    text: 'За пятнадцать минут получила деньги в компании Займер. Отправила к ним заявку на пробу, были у меня проблемы с КИ. Но может просто сумму просила маленькую - одобрение пришло сразу, а деньги на карту черездесять минут. Читала, что они помогают улучшить кредитную, буду занимать только здесь, про результат напишу.',
    name: 'Валентина',
    rating: 3
  },
  {
    id: 2,
    text: 'Как удачно получилось, что вы работаете круглосуточно. Просто мне поздно вечером пришло сообщение, что нужно срочно оплатить взнос за строительство гаража. Как этот долг у меня образовался, не представляю. А где я могу найти деньги среди ночи? На удачу отправила заявку в компанию Займер. И ура! Не только быстро одобрили, но и перевели деньги на счет сразу, я их автоматом дальше отправила! Просто меня спасли, спасибо.',
    name: 'Татьяна',
    rating: 2
  },
  {
    id: 3,
    text: 'Максимально что можно там взять при регистрации это 1000 рублей не больше. Зря потратил своё время на эту регистрацию.',
    name: 'Семен',
    rating: 5
  },
  {
    id: 4,
    text: 'Как удачно получилось, что вы работаете круглосуточно. Просто мне поздно вечером пришло сообщение, что нужно срочно оплатить взнос за строительство гаража. Как этот долг у меня образовался, не представляю. А где я могу найти деньги среди ночи? На удачу отправила заявку в компанию Займер. И ура! Не только быстро одобрили, но и перевели деньги на счет сразу, я их автоматом дальше отправила! Просто меня спасли, спасибо.',
    name: 'Татьяна',
    rating: 1
  },
  {
    id: 5,
    text: 'Максимально что можно там взять при регистрации это 1000 рублей не больше. Зря потратил своё время на эту регистрацию.',
    name: 'Семен',
    rating: 4
  },
  {
    id: 6,
    text: 'За пятнадцать минут получила деньги в компании Займер. Отправила к ним заявку на пробу, были у меня проблемы с КИ. Но может просто сумму просила маленькую - одобрение пришло сразу, а деньги на карту через десять минут. Читала, что они помогают улучшить кредитную, буду занимать только здесь, про результат напишу.',
    name: 'Валентина',
    rating: 2
  }
]

class Testimonials extends Component {


  render() {
    const id = this.props.match.params.id
    const { partners } = this.props
    const partner = partners[id]
    console.log(partners[id])

    return (
      <div className="wr-testimonials">
        <div className="container">
          <div className="testimonials">
            <header>
              <h2>Отзывы кредита “{partner && partner.main.title}”
                <div className="rating">
                  <ul className="rate-4">
                    <li><i className="fas fa-star"></i></li>
                    <li><i className="fas fa-star"></i></li>
                    <li><i className="fas fa-star"></i></li>
                    <li><i className="fas fa-star"></i></li>
                    <li><i className="fas fa-star"></i></li>
                  </ul>
                  <p>22 отзыва</p>
                  {partner && partner.sort && <span>(partner.sort.rating из 5)</span>}
                </div>
              </h2>
              <figure>
                <img src={partner && `/${partner.main.logo}`}/>
              </figure>
            </header>
            <Masonry className="masonry">
              {testi.map((item) => (
                <Testi key={item.id} text={item.text} user={item.name} rating={item.rating} />
              ))}
            </Masonry>
            <LeaveTesti id={id} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Testimonials)
