import { observer } from 'mobx-react'
import * as React from 'react'

import { ICurrent } from '../interfaces'

import './Pagination.css'

@observer
export class Pagination extends React.Component<IPaginationProps, {}> {
	constructor(props: IPaginationProps) {
		super(props)
		this.start = this.start.bind(this)
		this.back = this.back.bind(this)
		this.next = this.next.bind(this)
		this.last = this.last.bind(this)
	}

	public componentDidUpdate() {
		if (this.props.current.page > this.props.lastPage) {
			this.props.current.page = this.props.lastPage
		}
	}

	public render() {
		return (
			<div className='pagination'>
				{this.props.lastPage > 0 && (
					<div className='pagination-buttons'>
						{this.props.current.page > 1 && (
							<div className='pagination-back-to-start button' onClick={this.start}>
								&lt;&lt;
							</div>
						)}
						{this.props.current.page > 0 && (
							<div className='pagination-back button' onClick={this.back}>
								&lt;
							</div>
						)}
						<div className='pagination-current button'>
							{this.props.current.page + 1}
						</div>
						{this.props.current.page < this.props.lastPage && (
							<div className='pagination-next button' onClick={this.next}>
								&gt;
							</div>
						)}
						{this.props.current.page < this.props.lastPage - 1 && (
							<div className='pagination-last-page button' onClick={this.last}>
								&gt;&gt;
							</div>
						)}
					</div>
				)}
			</div>
		)
	}

	private start() {
		this.props.current.page = 0
	}
	private back() {
		this.props.current.page --
	}
	private next() {
		this.props.current.page ++
	}
	private last() {
		this.props.current.page = this.props.lastPage
	}

}

export interface IPaginationProps {
	lastPage: number
	current: ICurrent
}
