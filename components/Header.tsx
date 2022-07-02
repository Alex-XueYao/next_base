import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<header className={`${isScrolled && 'bg-[#141414]'}`}>
			<div className='flex items-center space-x-2 md:space-x-10'>
				<img
					width={40}
					src='https://raw.githubusercontent.com/Alex-XueYao/picGo/main/imgs/2022/07/012022_07_01_16_35_01.png'
					className='cursor-pointer object-cover object-center rounded-md'
				/>

				<ul className='hidden space-x-4 md:flex'>
					<li className='headerLink'>Home</li>
					<li className='headerLink'>TV Shows</li>
					<li className='headerLink'>Movies</li>
					<li className='headerLink'>New & Popular</li>
					<li className='headerLink'>My List</li>
				</ul>
			</div>

			<div className='flex items-center space-x-4 text-sm font-light'>
				<SearchIcon className='hidden h-6 w-6 sm:inline' />
				<p className='hidden lg:inline'>Kids</p>
				<BellIcon className='h-6 w-6' />
				<Link href='/account'>
					<img src='https://rb.gy/g1pwyx' className='cursor-pointer rounded' />
				</Link>
			</div>
		</header>
	)
}

export default Header
