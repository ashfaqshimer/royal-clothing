import React, { useState } from 'react';
import FormInput from '../FormInput/FormInput';
import CustomButton from '../CustomButton/CustomButton';
import { auth, signInWithGoogle } from '../../utils/firebase';

import './SignIn.scss';

const SignIn = () => {
	const [inputs, setInputs] = useState({ email: '', password: '' });

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = inputs;
		try {
			await auth.signInWithEmailAndPassword(email, password);
			setInputs({ email: '', password: '' });
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		const { value, name } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	return (
		<div className='SignIn'>
			<h2 className='text-center'>I Already Have An Account</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					name='email'
					type='email'
					handleChange={handleChange}
					value={inputs.email}
					label='email'
					required
				/>
				<FormInput
					name='password'
					type='password'
					handleChange={handleChange}
					value={inputs.password}
					label='password'
					required
				/>
				<div className='buttons'>
					<CustomButton type='submit'>Sign In</CustomButton>
					<CustomButton onClick={signInWithGoogle} isGoogleSignIn>
						Sign In With Google
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
