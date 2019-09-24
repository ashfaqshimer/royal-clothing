import React from 'react';
import { connect } from 'react-redux';
import { clearItem, addItem, removeItem } from '../../redux/cart/cartActions';

import './CheckoutItem.scss';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	return (
		<div className='CheckoutItem'>
			<div className='row align-items-center'>
				<div className='col-3 image-container'>
					<img src={imageUrl} alt='item' />
				</div>
				<div className='col-3 name'>{name}</div>
				<div className='col-2 quantity'>
					<span
						className='arrow'
						onClick={() => removeItem(cartItem)}
					>
						&#10094;
					</span>
					{quantity}
					<span className='arrow' onClick={() => addItem(cartItem)}>
						&#10095;
					</span>
				</div>
				<div className='col-3 price'>{price}</div>
				<div
					className='col-1 remove-button'
					onClick={() => clearItem(cartItem)}
				>
					&#10005;
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	clearItem: (item) => dispatch(clearItem(item)),
	addItem: (item) => dispatch(addItem(item)),
	removeItem: (item) => dispatch(removeItem(item))
});

export default connect(
	null,
	mapDispatchToProps
)(CheckoutItem);
