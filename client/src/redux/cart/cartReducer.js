import {
	TOGGLE_CART,
	ADD_ITEMS,
	REMOVE_ITEM,
	CLEAR_ITEM
} from '../actionTypes';
import { addItemToCart, removeItemFromCart } from './cartUtils';

const INITIAL_STATE = {
	showCart: false,
	cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TOGGLE_CART:
			return { ...state, showCart: !state.showCart };

		case ADD_ITEMS:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, action.payload)
			};

		case REMOVE_ITEM:
			return {
				...state,
				cartItems: removeItemFromCart(state.cartItems, action.payload)
			};

		case CLEAR_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(cartItem) => cartItem.id !== action.payload.id
				)
			};

		default:
			return state;
	}
};

export default cartReducer;
