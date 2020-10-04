import React from 'react';
import PropTypes from 'prop-types';

import { textParser } from '../../utils';

import style from './home-page.module.css';

export function HomePage({ map, times }) {
	return (
		<div className={style.layout}>
			<div className={style.track}>
				<div>TOTD is:</div>
				<div className={style.trackName}>{textParser(map.name)}</div>
			</div>

			<div className={style.AT}>
				<div className={style.authorMedal}>
					<img src="/author.png" alt="" />
				</div>
				<div className={style.time}>{times.author}</div>
			</div>

			<div className={style.medals}>
				<div className={style.medal}>
					<img src="/gold.png" alt="" />
					{times.gold}
				</div>
				<div className={style.medal}>
					<img src="/silver.png" alt="" />
					{times.silver}
				</div>
				<div className={style.medal}>
					<img src="/bronze.png" alt="" />
					{times.bronze}
				</div>
			</div>
		</div>
	);
}

HomePage.propTypes = {
	map: PropTypes.shape({
		name: PropTypes.string
	}),
	times: PropTypes.shape({
		author: PropTypes.string,
		gold: PropTypes.string,
		silver: PropTypes.string,
		bronze: PropTypes.string
	})
};
