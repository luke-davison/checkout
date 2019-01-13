import { computed, observable } from 'mobx'
import { ICurrent, IFilters, IItem  } from '../interfaces'

const itemsPerPage = 12

export class State {
	@observable public loaded?: boolean
	@observable public masterItems: IItem[] = []
	@observable public filters: IFilters = {column: 'none', ascending: false, excludeSoldOut: false}
	@observable public cartOpen?: boolean
	@observable public error?: string
	@observable public current: ICurrent = {page: 0}
	
	@computed get filteredItems(): IItem[] {
		let items = this.masterItems.filter((item) => !this.filters.name || item.name.toLowerCase().indexOf(this.filters.name.toLowerCase()) !== -1)
		if (this.filters.excludeSoldOut) {
			items = items.filter((item) => item.quantity)
		}
		const j = !this.filters.ascending ? 1 : -1
		switch (this.filters.column) {
			case 'none':
				items.sort((itemA, itemB) => itemA.name > itemB.name ? j : -j)
			break
			case 'price':
				items.sort((itemA, itemB) => itemA.price > itemB.price ? j : -j)
			break
			case 'quantity':
				items.sort((itemA, itemB) => itemA.quantity > itemB.quantity ? j : -j)
			break
		}

		return items
	}

	@computed get items(): IItem[] {
		return this.filteredItems.filter((item, i) => i >= this.current.page * itemsPerPage && i < (this.current.page + 1) * itemsPerPage)
	}

	@computed get lastPage(): number {
		return Math.floor((this.filteredItems.length - 1) / itemsPerPage)
	}

}

export const state = new State()