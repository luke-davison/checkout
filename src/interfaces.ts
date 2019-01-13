export interface IItem {
	id: number
	name: string
	image: string
	price: number
	quantity: number
	quantityInCart: number
}

export interface IFilters {
	name?: string
	column: string
	ascending: boolean
	excludeSoldOut: boolean
}

export interface ICurrent {
	page: number
}

// export type sortType = 'quantity' | 'price' | 'none'