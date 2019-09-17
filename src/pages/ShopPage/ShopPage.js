import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
	firestore,
	convertCollectionsSnapshotToMap
} from '../../utils/firebase';
import CollectionOverview from '../../components/CollectionOverview/CollectionOverview';
import CollectionPage from '../CollectionPage/CollectionPage';
import { updateCollections } from '../../redux/shop/shopActions';
import withSpinner from '../../components/withSpinner/withSpinner';

const CollectionOverviewWithSpinner = withSpinner(CollectionOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

const ShopPage = ({ match, updateCollections }) => {
	const [isLoading, setisLoading] = useState(true);

	useEffect(() => {
		const collectionRef = firestore.collection('collections');

		collectionRef.onSnapshot(async (snapshot) => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
			updateCollections(collectionsMap);
			setisLoading(false);
		});
	}, []);

	return (
		<div>
			<Route
				exact
				path={`${match.path}`}
				render={(props) => (
					<CollectionOverviewWithSpinner
						isLoading={isLoading}
						{...props}
					/>
				)}
			/>
			<Route
				path={`${match.path}/:collectionId`}
				render={(routeProps) => (
					<CollectionPageWithSpinner
						isLoading={isLoading}
						{...routeProps}
					/>
				)}
			/>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	updateCollections: (collectionsMap) =>
		dispatch(updateCollections(collectionsMap))
});

export default connect(
	null,
	mapDispatchToProps
)(ShopPage);
