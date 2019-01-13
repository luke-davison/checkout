import * as randomName from 'random-name'

import { IItem } from '../interfaces'

export function getItems(): Promise<IGetItemsResponse> {
	const items = generateItems()
	const response: IGetItemsResponse = {items}
	return  new Promise((resolve) => {
		setTimeout(() => resolve(response), 500)
	})
}

export interface IGetItemsResponse {
	error?: string
	items: IItem[]
}

function generateItems() {
	const items: IItem[] = []
	const numOfItems = Math.floor(Math.random() * 100) + 20
	for (let id = 0; id < numOfItems; id++) {
		const width: number = Math.floor(Math.random() * 1000) + 100
		const height = width
		const image: string = `http://placekitten.com/${width}/${height}`
		const name: string = randomName.first()
		const price: number = Math.floor(Math.random() * 2000) / 100
		let quantity = Math.floor(Math.random() * 100) - 20
		if (quantity < 0) {
			quantity = 0
		}
		items.push({id, quantity, image, name, price, quantityInCart: 0})
	}
	return items
}