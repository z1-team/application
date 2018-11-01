import React, {Component} from 'react'

class ResultsPagination extends Component {
	render() {
		return (
			<div className="pagination">
				<ul>
					<li>
						<a href="#">Пред.</a>
					</li>
					<li>
						<a href="#">1</a>
					</li>
					<li>
						<a href="#">2</a>
					</li>
					<li class="active">
						<a href="#">3</a>
					</li>
					<li>
						<a href="#">4</a>
					</li>
					<li>
						<a href="#">5</a>
					</li>
					<li>
						<a href="#">След.</a>
					</li>
				</ul>
			</div>
		)
	}
}

export default ResultsPagination