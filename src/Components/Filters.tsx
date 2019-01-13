import { observer } from 'mobx-react'
import * as React from 'react'

import { IFilters } from '../interfaces'

import './Filters.css'

@observer
export class Filters extends React.Component<IFiltersProps, {}> {
	constructor(props: IFiltersProps) {
		super(props)
		this.filterByName = this.filterByName.bind(this)
		this.sortBy = this.sortBy.bind(this)
		this.toggleSoldOut = this.toggleSoldOut.bind(this)
		this.toggleOrder = this.toggleOrder.bind(this)
	}
	
	public render() {
		return (
			<div className='filters row'>
				<div className='filter-by-name col-sm-12 col-md-4'>
					<div className='filter-title'>
						Filter by Name
						<br/>
						<input type='text' onChange={this.filterByName} />
					</div>
				</div>
				<div className='sort-by col-sm-6 col-md-4'>
					<div className='filter-title'>
						Sort by
						<br/>
						<select onChange={this.sortBy} value={this.props.filters.column} >
							<option value='none'>Alphabetical</option>
							<option value='price'>Price</option>
							<option value='quantity'>Quantity</option>
						</select>
						<span className='sort-order button' onClick={this.toggleOrder}>
							{this.props.filters.ascending ? '↑' : '↓'}
						</span>
					</div>
				</div>
				<div className='exclude-sold-out col-sm-6 col-md-4'>
					<br/>
					<input type='checkbox' checked={this.props.filters.excludeSoldOut} onChange={this.toggleSoldOut} />
					Exclude Sold Out
				</div>
			</div>
		)
	}

	private filterByName(e: React.ChangeEvent<HTMLInputElement>) {
		this.props.filters.name = e.currentTarget.value
	}

	private sortBy(e: React.ChangeEvent<HTMLSelectElement>) {
		this.props.filters.column = e.currentTarget.value
	}

	private toggleSoldOut() {
		this.props.filters.excludeSoldOut = ! this.props.filters.excludeSoldOut
	}

	private toggleOrder() {
		this.props.filters.ascending = !this.props.filters.ascending
	}
}

export interface IFiltersProps {
	filters: IFilters
}
