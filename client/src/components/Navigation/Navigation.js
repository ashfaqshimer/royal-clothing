import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './Navigation.scss';
import { auth } from '../../utils/firebase';
import CartIcon from '../CartIcon/CartIcon';
import CartDropdown from '../CartDropdown/CartDropdown';
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Navigation = ({ currentUser, showCart }) => {
	return (
		<Navbar className='Navigation' bg='light' expand='md'>
			<Link to='/'>
				<Navbar.Brand>
					<Logo />
					<span className='brand-name'>Royal Clothing</span>
				</Navbar.Brand>
			</Link>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto options'>
					<Link className='option nav-link' to='/shop'>
						SHOP
					</Link>
					<Link className='option nav-link' to='/shop'>
						CONTACT
					</Link>
					{currentUser ? (
						<div
							className='option nav-link'
							onClick={() => auth.signOut()}
						>
							SIGN OUT
						</div>
					) : (
						<Link className='option nav-link' to='/signin'>
							SIGN IN
						</Link>
					)}
					<CartIcon />
				</Nav>
				{showCart && <CartDropdown />}
			</Navbar.Collapse>
		</Navbar>
	);
};

const mapStateToProps = ({ user: { currentUser }, cart: { showCart } }) => ({
	currentUser,
	showCart
});

export default connect(mapStateToProps)(Navigation);
