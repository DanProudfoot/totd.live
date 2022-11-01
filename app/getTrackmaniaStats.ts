import {
  loginUbi,
  loginTrackmaniaUbi,
  loginTrackmaniaNadeo,
  getTOTDs,
  getMaps
} from 'trackmania-api-node';

export interface TrackTimes {
  author: string;
  gold: string;
  silver: string;
  bronze: string;
}

function msToM(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(3);

  return `${minutes}:${millis < 10 * 1000 ? '0' : ''}${seconds}`;
}

const login = async (credentials: string) => {
  try {
    const { ticket } = await loginUbi(credentials);
    const ubiTokens = await loginTrackmaniaUbi(ticket);
    const nadeoTokens = await loginTrackmaniaNadeo(
      ubiTokens.accessToken,
      'NadeoLiveServices'
    );
    return {
      ticket,
      ubiTokens,
      nadeoTokens,
      accountId: nadeoTokens.accountId
    };
  } catch (e) {
    // axios error
    // console.log(e.toJSON());
    console.error(e);
  }
};

const getTOTD = async (accessToken: string) => {
  try {
    const totd = await getTOTDs(accessToken);
    // console.log(totd);

    return totd;
  } catch (e) {
    // axios error
    // console.log(e.toJSON());
  }
};

const getMap = async (accessToken: string, mapUid: string | string[]) => {
  const uids = Array.isArray(mapUid) ? mapUid : [mapUid];
  const map = await getMaps(accessToken, uids);

  return map[0];
};

export const getTOTDBundle = async () => {
  const credentials = Buffer.from(
    `${process.env.UBI_USER}:${process.env.UBI_PASS}`
  ).toString('base64');

  const loggedIn = await login(credentials);

  if (loggedIn) {
    const totd = await getTOTD(loggedIn.nadeoTokens.accessToken);

    const availableMaps = totd?.monthList[0].days.filter((day) => day.mapUid);
    const today = availableMaps?.slice(-1);

    const map = await getMap(
      loggedIn.ubiTokens.accessToken,
      today?.[0].mapUid ?? ''
    );

    const times: TrackTimes = {
      author: msToM(map?.authorScore ?? 0),
      gold: msToM(map?.goldScore ?? 0),
      silver: msToM(map?.silverScore ?? 0),
      bronze: msToM(map?.bronzeScore ?? 0)
    };

    return {
      map,
      times
    };
  } else {
    throw new Error('No user logged in');
  }
};
