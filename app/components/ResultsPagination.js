import React, {Component} from 'react'
import PropTypes from "prop-types";

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
	let i = from
	const range = []

	while(i <= to) {
		range.push(i)
		i += step
	}

	return range
}

class ResultsPagination extends Component {
	constructor(props) {
		super(props)


	}

	componentDidMount() {
    this.gotoPage(1)
  }

	gotoPage = page => {
    const { onChange } = this.props

    const currentPage = page

		if(typeof onChange === 'function') {
			onChange(currentPage)
		}
  }

	fetchPageNumbers = () => {

		const { totalCards, pageLimit, pageNeighbours, currentPage } = this.props

    const totalPages = Math.ceil(totalCards / pageLimit)

    const totalNumbers = (pageNeighbours * 2) + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {

      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)

      let pages = range(startPage, endPage)

      const hasLeftSpill = startPage > 2
      const hasRightSpill = (totalPages - endPage) > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }

        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }

        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }

      return [1, ...pages, totalPages]

    }

    return range(1, totalPages);
  }

	handleClick = page => event => {
		event.preventDefault()
		this.gotoPage(page)

		window.scrollTo({
			top: document.getElementById('results').getBoundingClientRect().top + window.pageYOffset - 100,
			behavior: "smooth"
		})
	}

	handleMoveLeft = event => {
		event.preventDefault();
		const {pageNeighbours, currentPage} = this.props
    this.gotoPage(currentPage - (pageNeighbours * 2) - 1)
  }

  handleMoveRight = event => {
    event.preventDefault();
		const {pageNeighbours, currentPage} = this.props
    this.gotoPage(currentPage + (pageNeighbours * 2) + 1)
  }

	render() {
		const { totalCards, pageLimit, pageNeighbours, currentPage } = this.props
		const totalPages = Math.ceil(totalCards / pageLimit)

		if (!totalCards || totalPages === 1) return null

    const pages = this.fetchPageNumbers()

		return (
			<div className="pagination">
				<ul>
					{pages.map((page, index) => {
						if (page === LEFT_PAGE) return (
              <li key={index}>
                <a className="page-link" href="#" aria-label="Previous" onClick={this.handleMoveLeft}>&laquo;</a>
              </li>
            )

            if (page === RIGHT_PAGE) return (
              <li key={index}>
                <a href="#" aria-label="Next" onClick={this.handleMoveRight}>&raquo;</a>
              </li>
            )

            return (
              <li key={index} className={ currentPage === page ? ' active' : ''}>
                <a href="#" onClick={ this.handleClick(page) }>{ page }</a>
              </li>
            )
					})}
				</ul>
			</div>
		)
	}
}

ResultsPagination.propTypes = {
  totalCards: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default ResultsPagination
