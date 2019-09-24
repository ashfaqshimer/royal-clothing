import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverviewContainer from '../../components/CollectionOverview/CollectionOverviewContainer';
import { fetchCollectionsStartAsync } from '../../redux/shop/shopActions';
import CollectionPageContainer from '../CollectionPage/CollectionPageContainer';

const ShopPage = ({
	match,
	fetchCollectionsStartAsync,
	isCollectionFetching
}) => {
	useEffect(() => {
		fetchCollectionsStartAsync();
	}, [fetchCollectionsStartAsync]);

	return (
		<div>
			<Route
				exact
				path={`${match.path}`}
				component={CollectionOverviewContainer}
			/>
			<Route
				path={`${match.path}/:collectionId`}
				component={CollectionPageContainer}
			/>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync)
});

export default connect(
	null,
	mapDispatchToProps
)(ShopPage);
