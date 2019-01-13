import { observer } from 'mobx-react'
import * as React from 'react'

import { IItem } from '../interfaces'
import { AddToCart } from './AddToCart'
import { Item } from './Item'

import './Cart.css'

@observer
export class Cart extends React.Component <ICartProps, {}> {
	public render() {
		return (
			<div className='cart'>
				<div className='cart-headers'>
					<div className='cart-header'>
						Item
					</div>
					<div className='cart-header'>
						Number in Cart
					</div>
				</div>
				{this.props.items.map((item: IItem) => (
					<div className='cart-row' key={item.id}>
						<Item item={item} />
						<AddToCart item={item} />
					</div>
				))}
			</div>
		)
	}
}

interface ICartProps {
	items: IItem[]
}
