import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './CartDropdown.scss';
import CustomButton from '../CustomButton/CustomButton';
import CartItem from '../CartItem/CartItem';
import { selectCartItems } from '../../redux/cart/cartSelectors';
import { toggleCart } from '../../redux/cart/cartActions';

const CartDropdown = ({ cartItems, history, dispatch }) => {
	const handleClick = (e) => {
		history.push('/checkout');
		dispatch(toggleCart());
	};

	return (
		<div className='CartDropdown'>
			<div className='cart-items'>
				{cartItems.length ? (
					cartItems.map((cartItem) => (
						<CartItem key={cartItem.id} item={cartItem} />
					))
				) : (
					<span className='empty-message'>Your cart is empty.</span>
				)}
			</div>
			<CustomButton onClick={handleClick}>GO TO CHECKOUT</CustomButton>
		</div>
	);
};

const mapStateToProps = (state) => ({ cartItems: selectCartItems(state) });

export default withRouter(connect(mapStateToProps)(CartDropdown));
