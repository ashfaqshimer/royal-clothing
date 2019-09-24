import {
	TOGGLE_CART,
	ADD_ITEMS,
	REMOVE_ITEM,
	CLEAR_ITEM
} from '../actionTypes';

export const toggleCart = () => ({ type: TOGGLE_CART });

export const addItem = (item) => ({
	type: ADD_ITEMS,
	payload: item
});

export const removeItem = (item) => ({ type: REMOVE_ITEM, payload: item });

export const clearItem = (item) => ({ type: CLEAR_ITEM, payload: item });
