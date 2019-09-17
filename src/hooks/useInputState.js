import { useState } from 'react';

const useInputState = (initialValue) => {
	const [state, setstate] = useState(initialValue);
	const handleChange = (e) => {
		setstate(e.target.value);
	};
	const resetstate = (e) => {
		setstate('');
	};
	return [state, handleChange, resetstate];
};

export default useInputState;
