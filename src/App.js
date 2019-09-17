import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Navigation from './components/Navigation/Navigation';
import Homepage from './pages/Homepage/Homepage';
import ShopPage from './pages/ShopPage/ShopPage';
import AuthenticationPage from './pages/AuthenticationPage/AuthenticationPage';
import './App.scss';
import { auth, createUserProfileDocument } from './utils/firebase';
import { selectCurrentUser } from './redux/user/userSelectors';
import { setCurrentUser } from './redux/user/userActions';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';

function App({ currentUser, setCurrentUser }) {
	useEffect(() => {
		const unsubscribeFromAuth = auth.onAuthStateChanged(
			async (userAuth) => {
				if (userAuth) {
					const userRef = await createUserProfileDocument(userAuth);

					userRef.onSnapshot((snapShot) => {
						setCurrentUser({
							id: snapShot.id,
							...snapShot.data()
						});
					});
				}

				setCurrentUser(userAuth);
			}
		);
		return () => {
			unsubscribeFromAuth();
		};
	}, []);

	return (
		<div className='App'>
			<Navigation />
			<Container>
				<Switch>
					<Route exact path='/' render={() => <Homepage />} />
					<Route
						path='/shop'
						render={(routeProps) => <ShopPage {...routeProps} />}
					/>
					<Route
						exact
						path='/signin'
						render={() =>
							currentUser ? (
								<Redirect to='/' />
							) : (
								<AuthenticationPage />
							)
						}
					/>
					<Route
						exact
						path='/checkout'
						render={() => <CheckoutPage />}
					/>
				</Switch>
			</Container>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
