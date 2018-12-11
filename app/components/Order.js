import React, {Component} from 'react'

import RangeInput from './RangeInput'

class Order extends Component {

  handleSubmit = (event) => {
    event.preventDefault()
  }

  render() {
    return (
      <div className="wr-order">
        <div className="container">
          <div className="leave-order">
            <h2>Заявка на получение займа</h2>
            <form action="#" onSubmit={this.handleSubmit}>
              <section>
                <h3>Общие сведения</h3>
                <div className="form-input">
                  <label>Имя</label>
                  <input type="text"/>
                </div>
                <div className="form-input">
                  <label>Фамилия</label>
                  <input type="text"/>
                </div>
                <div className="form-input">
                  <label>Email</label>
                  <input type="text"/>
                </div>
                <div className="form-input">
                  <label>Телефон</label>
                  <input type="text"/>
                </div>
                <div className="form-input">
                  <label>Город проживания</label>
                  <input type="text"/>
                </div>
              </section>
              <section>
                <h3>Ваш кредит</h3>
                <div className="form-range">
                  <label>Сколько нужно в рублях?</label>
                  <RangeInput name="summ" start={100} end={50000} step={100} onChange={this.handleChange} />
                </div>
                <div className="form-input">
                  <label>Когда нужны деньги?</label>
                  <input type="text"/>
                </div>
                <div className="form-input">
                  <label>Когда вернете?</label>
                  <input type="text"/>
                </div>
              </section>
              <section>
                <h3>Паспортные данные</h3>
                <div className="form-input">
                  <label>Отчество</label>
                  <input type="text"/>
                </div>
                <div className="form-input">
                  <label>Серия и номер паспорта</label>
                  <input type="text"/>
                </div>
                <div className="form-input">
                  <label>Дата рождения</label>
                  <input type="text"/>
                </div>
                <div className="form-input">
                  <label>Дата выдачи</label>
                  <input type="text"/>
                </div>
              </section>
              <footer>
                <label><input type="checkbox"/>Я соглашаюсь на обрабутку данных и с <a href="#">Правилами пользования</a>.</label>
                <button>Отправить отзыв</button>
              </footer>
            </form>
            <div className="need-help">
                <h3>Нужна помощь?</h3>
                <p>Наши консультанты окажут вам любую помощь по бесплатному телефону в Москве.</p>
                <a href="tel:+74956665544"><i class="fas fa-phone"></i>+7 (495) 666-55-44</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Order
