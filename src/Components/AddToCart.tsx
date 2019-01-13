import { observer } from 'mobx-react'
import * as React from 'react'

import { IItem } from '../interfaces'

import './AddToCart.css'

@observer
export class AddToCart extends React.Component <IAddToCartProps, {}> {
	constructor(props: IAddToCartProps) {
		super(props)
		this.addToCart = this.addToCart.bind(this)
		this.reduceQuantity = this.reduceQuantity.bind(this)
		this.increaseQuantity = this.increaseQuantity.bind(this)
		this.enterQuantity = this.enterQuantity.bind(this)
	}

	public render() {
		return (
			<div className='add-to-cart'>
				{this.props.item.quantity === 0 && (
					<div className='sold-out button'>
						Sold Out
					</div>
				)}
				{this.props.item.quantity > 0 && this.props.item.quantityInCart > 0 && (
					<div className='add-to-cart-quantity'>
						<div className='reduce-quantity button'>
							{this.props.item.quantityInCart > 0 && (
								<div onClick={this.reduceQuantity}>
									&lt;
								</div>
							)}
						</div>
						<input
							className='add-to-cart-input no-spin'
							type='number'
							onChange={this.enterQuantity}
							value={this.props.item.quantityInCart > 0 ? this.props.item.quantityInCart : ''}
						/>
						<div className='increase-quantity button'>
							{this.props.item.quantityInCart < this.props.item.quantity && (
								<div onClick={this.increaseQuantity}>
									&gt;
								</div>
							)}
						</div>
					</div>
				)}
				{this.props.item.quantity <= 5 && this.props.item.quantity > 0 && this.props.item.quantityInCart === 0 && (
					<div className='low-stock button' onClick={this.addToCart}>
						Only {this.props.item.quantity} Left
					</div>
				)}
				{this.props.item.quantity > 5 && this.props.item.quantityInCart === 0 && (
					<div className='add-to-cart button' onClick={this.addToCart}>
						Add to Cart
					</div>
				)}
				{this.props.item.quantityInCart > this.props.item.quantity && (
					<div className='add-to-cart-warning'>
						Only {this.props.item.quantity} available
					</div>
				)}
			</div>
		)
	}

	private addToCart(): void {
		this.props.item.quantityInCart = 1
	}

	private reduceQuantity(): void {
		this.props.item.quantityInCart = this.props.item.quantityInCart - 1
	}

	private increaseQuantity(): void {
		this.props.item.quantityInCart = this.props.item.quantityInCart + 1
	}

	private enterQuantity(e: React.ChangeEvent<HTMLInputElement>): void {
		const value = Number(e.currentTarget.value)
		if (value || value === 0) {
			this.props.item.quantityInCart = value
		}
	}
}

interface IAddToCartProps {
	item: IItem
}
