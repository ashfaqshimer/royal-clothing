import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../CollectionPreview/CollectionPreview';
import { selectCollectionsForPreview } from '../../redux/shop/shopSelectors';

import './CollectionOverview.scss';

const CollectionOverview = ({ collections }) => {
	return (
		<div className='CollectionOverview'>
			{collections.map(({ id, ...otherCollectionProps }) => (
				<CollectionPreview key={id} {...otherCollectionProps} />
			))}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionOverview);
