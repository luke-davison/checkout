import { observer } from 'mobx-react'
import * as React from 'react'

import { IItem } from '../interfaces'

import './Item.css'

@observer
export class Item extends React.Component<IItemProps, {}> {
	public render() {
		return (
			<div className='item'>
				<div className='item-title'>
					{this.props.item.name}
				</div>
				<div className={this.props.item.quantity > 0 ? 'item-image' : 'item-image item-image-sold-out'}>
					<img src={this.props.item.image} />
				</div>
				<div className='item-price'>
					${this.props.item.price.toFixed(2)}
				</div>
			</div>
		)
	}
}

export interface IItemProps {
	item: IItem
	minimal?: boolean
}
