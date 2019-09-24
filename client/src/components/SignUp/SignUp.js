import React, { useState } from 'react';
import FormInput from '../FormInput/FormInput';
import { auth, createUserProfileDocument } from '../../utils/firebase';
import './SignUp.scss';
import CustomButton from '../CustomButton/CustomButton';

const SignUp = () => {
	const [formInputs, setformInputs] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setformInputs({ ...formInputs, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { displayName, email, password, confirmPassword } = formInputs;

		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await createUserProfileDocument(user, { displayName });

			setformInputs({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: ''
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='SignUp'>
			<h2 className='title'>I do not have an account</h2>
			<span>Sign up with your email and password</span>
			<form className='sign-up-form' onSubmit={handleSubmit}>
				<FormInput
					type='text'
					name='displayName'
					value={formInputs.displayName}
					onChange={handleChange}
					label='Display Name'
					required
				/>
				<FormInput
					type='email'
					name='email'
					value={formInputs.email}
					onChange={handleChange}
					label='Email'
					required
				/>
				<FormInput
					type='password'
					name='password'
					value={formInputs.password}
					onChange={handleChange}
					label='Password'
					required
				/>
				<FormInput
					type='password'
					name='confirmPassword'
					value={formInputs.confirmPassword}
					onChange={handleChange}
					label='Confirm Password'
					required
				/>
				<CustomButton type='submit'>SIGN UP</CustomButton>
			</form>
		</div>
	);
};

export default SignUp;
