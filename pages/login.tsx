import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Head from 'next/head'
import Image from 'next/image'
import useAuth from '../hooks/useAuth'

interface Inputs {
	email: string
	password: string
}

const Login = () => {
	const [login, setLogin] = useState(false)
	const { signIn, signUp, user } = useAuth()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()
	const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
		if (login) {
			await signIn(email, password)
		} else {
			await signUp(email, password)
		}
	}

	return (
		<div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
			<Head>
				<title>Home - Login</title>
				<link
					rel='icon'
					href='https://raw.githubusercontent.com/Alex-XueYao/picGo/main/imgs/2022/07/012022_07_01_16_35_01.png'
				/>
			</Head>
			<Image
				layout='fill'
				className='-z-10 !hidden opacity-60 sm:!inline'
				objectFit='cover'
				src='/bg.jpeg'
			/>

			<img
				src='/logo.svg'
				className='absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6'
				width={150}
				height={150}
			/>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
			>
				<h1 className='text-4xl font-semibold'>Sign In</h1>
				<div className='space-y-4'>
					<label className='inline-block w-full'>
						<input
							{...register('email', { required: true })}
							type='email'
							placeholder='Email'
							className='input'
						/>
						{errors.email && (
							<span className='p-1 text-[13px] font-light text-orange-500'>
								Please enter a valid email.
							</span>
						)}
					</label>
					<label className='inline-block w-full'>
						<input
							{...register('password', {
								required: true,
								maxLength: 60,
								minLength: 4,
							})}
							type='password'
							placeholder='Password'
							className='input'
						/>
						{errors.password && (
							<span className='p-1 text-[13px] font-light text-orange-500'>
								Your password must contain between 4 and 60 character
							</span>
						)}
					</label>
				</div>

				<button
					onClick={() => setLogin(true)}
					className='w-full rounded bg-[#e50914] py-3 font-semibold'
				>
					Sign In
				</button>

				<div>
					New to Net? &nbsp;
					<button
						type='submit'
						className='text-white hover:underline'
						onClick={() => setLogin(false)}
					>
						Sign up now
					</button>
				</div>
			</form>
		</div>
	)
}

export default Login
