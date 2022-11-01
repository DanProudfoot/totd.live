import { CurrentTOTD } from 'components/CurrentTOTD/CurrentTOTD';
import Head from 'next/head';
import { getTOTDBundle } from './getTrackmaniaStats';

import styles from './index.module.css';

export default async function Home() {
  const { map, times } = await getTOTDBundle();

  return (
    <div className={styles.container}>
      <Head>
        <title>AT is: {times?.author}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CurrentTOTD map={map} times={times} />
      </main>

      <footer className={styles.footer}>
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
        className={styles.background}
        style={{ backgroundImage: `url(${map?.thumbnailUrl})` }}
      />
    </div>
  );
}
