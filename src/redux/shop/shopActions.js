import { UPDATE_COLLECTIONS } from '../actionTypes';

export const updateCollections = (collectionsMap) => ({
	type: UPDATE_COLLECTIONS,
	payload: collectionsMap
});
