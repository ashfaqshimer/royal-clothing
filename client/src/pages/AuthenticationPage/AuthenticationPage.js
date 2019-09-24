import React from 'react';

import './AuthenticationPage.scss';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';

const AuthenticationPage = () => {
	return (
		<div className='AuthenticationPage'>
			<div className='row justify-content-around'>
				<SignIn className='col' />
				<SignUp className='col' />
			</div>
		</div>
	);
};

export default AuthenticationPage;
