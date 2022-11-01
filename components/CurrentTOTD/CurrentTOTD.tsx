import React from 'react';
import Image from 'next/image';

import { textParser } from '../../utils';

import style from './current-totd.module.css';
import { Imaps } from 'trackmania-api-node';
import { TrackTimes } from 'app/getTrackmaniaStats';

interface CurrentTOTDProps {
  map: Imaps;
  times: TrackTimes;
}

export function CurrentTOTD({ map, times }: CurrentTOTDProps) {
  return (
    <div className={style.layout}>
      <div className={style.track}>
        <div>TOTD is:</div>
        <div className={style.trackName}>{textParser(map.name)}</div>
      </div>

      <div className={style.AT}>
        <Image
          className={style.authorMedal}
          src="/author.png"
          alt=""
          width="121"
          height="121"
        />

        <div className={style.time}>{times.author}</div>
      </div>

      <div className={style.medals}>
        <div className={style.medal}>
          <Image src="/gold.png" alt="" width="121" height="121" />
          {times.gold}
        </div>
        <div className={style.medal}>
          <Image src="/silver.png" alt="" width="121" height="121" />
          {times.silver}
        </div>
        <div className={style.medal}>
          <Image src="/bronze.png" alt="" width="121" height="121" />
          {times.bronze}
        </div>
      </div>
    </div>
  );
}
