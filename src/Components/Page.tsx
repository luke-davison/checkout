import { observer } from 'mobx-react'
import * as React from 'react'
import { GridLoader } from 'react-spinners'

import { getItems } from '../API/getItems'
import { IFilters, IItem } from '../interfaces'
import { state } from '../State'
import { Cart } from './Cart'
import { Filters } from './Filters'
import { Items } from './Items'
import { Pagination } from './Pagination'

import './Page.css'

@observer
export class Page extends React.Component<{}, IPageState> {
	constructor(props: {}) {
		super(props)
		this.fetchItems = this.fetchItems.bind(this)
	}

	public componentDidMount(): void {
		this.fetchItems()
	}

	public render() {
		return (
			<div className='page'>
				<Filters filters={state.filters} />
				<Items items={state.items} />
				<div className='loading-spinner'>
					<GridLoader
						sizeUnit={'px'}
						size={40}
						color={'salmon'}
						loading={!state.loaded}
						/>
				</div>
				<Pagination current={state.current} lastPage={state.lastPage} />
				{state.cartOpen && <Cart items={state.items.filter((item) => item.quantityInCart)} />}
			</div>
		)
	}

	private fetchItems(attempts: number = 0): void {
		attempts++
		getItems().then((response) => {
			if (response.error) {
				state.error = response.error
				if (attempts > 5) {
					state.error += '  Please try again later.'
				} else {
					state.error += '  Retrying...'
					setTimeout(() => this.fetchItems(attempts), attempts * 2000)
				}
			} else {
				state.masterItems = response.items
				state.loaded = true
			}
		})
	}
}

export interface IPageState {
	loaded?: boolean
	items: IItem[]
	filters: IFilters
	cartOpen?: boolean
	error?: string
}