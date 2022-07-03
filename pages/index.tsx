import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import { Movie } from '../typings'
import api from '../utils/api'
import requests from '../utils/request'

interface Props {
	netflixOriginals: Movie[]
	trendingNow: Movie[]
	topRated: Movie[]
	actionMovies: Movie[]
	comedyMovies: Movie[]
	horrorMovies: Movie[]
	romanceMovies: Movie[]
	documentaries: Movie[]
}

const Home: NextPage<Props> = ({
	netflixOriginals,
	trendingNow,
	topRated,
	actionMovies,
	comedyMovies,
	horrorMovies,
	romanceMovies,
	documentaries,
}) => {
	console.log('environment:', process.env.NODE_ENV)
	const { loading } = useAuth()
	const showModal = useRecoilValue(modalState)

	if (loading) return null
	return (
		<div
			className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
				showModal && '!h-screen overflow-hidden'
			}`}
		>
			<Head>
				<title>TailWind</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header />
			<main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
				<Banner netflixOriginals={netflixOriginals} />

				<section className='md:space-y-24'>
					<Row title={'Trending Now'} movies={trendingNow} />
					<Row title={'Top Rated'} movies={topRated} />
					<Row title={'Action Thrillers'} movies={actionMovies} />
					<Row title={'Comedies'} movies={comedyMovies} />
					<Row title={'Scary Movies'} movies={horrorMovies} />
					<Row title={'Romance Movies'} movies={romanceMovies} />
					<Row title={'Documentaries'} movies={documentaries} />
				</section>
			</main>

			{showModal && <Modal />}
		</div>
	)
}

export default Home

export const getServerSideProps = async () => {
	const [
		netflixOriginals,
		trendingNow,
		topRated,
		actionMovies,
		comedyMovies,
		horrorMovies,
		romanceMovies,
		documentaries,
	] = await Promise.all([
		api.get(requests.fetchNetflixOriginals),
		api.get(requests.fetchTrending),
		api.get(requests.fetchTopRated),
		api.get(requests.fetchActionMovies),
		api.get(requests.fetchComedyMovies),
		api.get(requests.fetchHorrorMovies),
		api.get(requests.fetchRomanceMovies),
		api.get(requests.fetchDocumentaries),
	])
	return {
		props: {
			netflixOriginals: netflixOriginals.data.results,
			trendingNow: trendingNow.data.results,
			topRated: topRated.data.results,
			actionMovies: actionMovies.data.results,
			comedyMovies: comedyMovies.data.results,
			horrorMovies: horrorMovies.data.results,
			romanceMovies: romanceMovies.data.results,
			documentaries: documentaries.data.results,
		},
	}
}
