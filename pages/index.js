import Head from 'next/head';
import PropTypes from 'prop-types';

import style from '../styles/Home.module.css';

import { HomePage } from '../components/HomePage/HomePage';
import { getTOTDBundle } from '../pages/api/totd.js';

export default function Home({ map, times }) {
	return (
		<div className={style.container}>
			<Head>
				<title>AT is: {times.author}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={style.main}>
				<HomePage map={map} times={times}></HomePage>
			</main>

			<footer className={style.footer}>
				<div>
					Report any issues{' '}
					<a href="https://github.com/DanProudfoot/totd.live/issues">
						on Github
					</a>
				</div>
				<div>
					Thanks to breeku for{' '}
					<a href="https://github.com/breeku/trackmania-api-node">
						trackmania-api-node
					</a>
				</div>
			</footer>
			<div
				className={style.background}
				style={{ backgroundImage: `url(${map.thumbnailUrl})` }}
			></div>
		</div>
	);
}

export async function getStaticProps(context) {
	const { map, times } = await getTOTDBundle();

	return {
		props: {
			map,
			times
		}, // will be passed to the page component as props
		revalidate: 10
	};
}

Home.propTypes = {
	map: PropTypes.shape({
		thumbnailUrl: PropTypes.string
	}),
	times: PropTypes.shape({
		author: PropTypes.string
	})
};
