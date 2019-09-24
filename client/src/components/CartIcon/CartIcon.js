import React from 'react';
import { connect } from 'react-redux';

import { toggleCart } from '../../redux/cart/cartActions';
import { selectCartItemsCount } from '../../redux/cart/cartSelectors';
import './CartIcon.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/11.3 shopping-bag.svg';

const CartIcon = ({ itemCount, toggleCart }) => {
	return (
		<div className='CartIcon' onClick={toggleCart}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{itemCount}</span>
		</div>
	);
};

const mapStateToProps = (state) => ({
	itemCount: selectCartItemsCount(state)
});

const mapDispatchToProps = (dispatch) => ({
	toggleCart: () => dispatch(toggleCart())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CartIcon);
