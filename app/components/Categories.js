import React, {Component} from 'react'

class Categories extends Component {
	constructor(props){
		super(props)
		this.state = {
			categories: [
				{
					id: 0,
					title: 'Пенсионерам',
					selected: true,
					count: '128',
					key: 'categories'
				},
				{
					id: 1,
					title: 'Без проверки',
					selected: false,
					count: '32',
					key: 'categories'
				},
				{
					id: 2,
					title: 'Круглосуточно',
					selected: false,
					count: '256',
					key: 'categories'
				},
				{
					id: 3,
					title: 'Онлайн',
					selected: false,
					count: '8',
					key: 'categories'
				},
				{
					id: 4,
					title: 'Под залог',
					selected: false,
					count: '16',
					key: 'categories'
				},
				{
					id: 5,
					title: 'На длительный срок',
					selected: false,
					count: '32',
					key: 'categories'
				},
				{
					id: 6,
					title: 'Без процентов',
					selected: false,
					count: '256',
					key: 'categories'
				},
			]
		}
	}

	render() {
		const list = this.state

		return (
			<div className="categories">
				<ul>
					{list.categories.map((item) => (
						<li key={item.id}>
							<a href="#" className={item.selected ? 'active' : ''}>
								<em>{item.title}</em>
								<span>{item.count}</span>
							</a>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default Categories