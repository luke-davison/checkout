import { observer } from 'mobx-react'
import * as React from 'react'

import { IItem } from '../interfaces'
import { AddToCart } from './AddToCart'
import { Item } from './Item'

import './Items.css'

@observer
export class Items extends React.Component<IItemsProps, {}> {
	public render() {
		return (
			<div className='items row'>
				{this.props.items.map((item: IItem) => (
					<div className='item-container col-sm-6 col-md-4 col-lg-3' key={item.id}>
						<Item item={item} />
						<AddToCart item={item} />
					</div>
				))}
			</div>
		)
	}
}

export interface IItemsProps {
	items: IItem[]
}
