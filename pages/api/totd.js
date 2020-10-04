const {
  loginUbi,
  loginTrackmaniaUbi,
  loginTrackmaniaNadeo,
  getTOTDs,
  getMaps,
} = require("trackmania-api-node");

function msToM(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(3);

  //   return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const login = async (credentials) => {
  try {
    const { ticket } = await loginUbi(credentials);
    const ubiTokens = await loginTrackmaniaUbi(ticket);
    const nadeoTokens = await loginTrackmaniaNadeo(
      ubiTokens.accessToken,
      "NadeoLiveServices"
    );
    return {
      ticket,
      ubiTokens,
      nadeoTokens,
      accountId: nadeoTokens.accountId,
    };
  } catch (e) {
    // axios error
    // console.log(e.toJSON());
    console.error(e);
  }
};

const getTOTD = async (accessToken) => {
  try {
    const totd = await getTOTDs(accessToken);
    // console.log(totd);

    return totd;
  } catch (e) {
    // axios error
    // console.log(e.toJSON());
  }
};

const getMap = async (accessToken, mapUid) => {
  try {
    const uids = Array.isArray(mapUid) ? mapUid : [mapUid];
    const map = await getMaps(accessToken, uids);

    return map[0];
  } catch (e) {
    // axios error
    console.log(e.toJSON());
    // console.error(e);
  }
};

export default async (req, res) => {
  const credentials = Buffer.from(
    `${process.env.UBI_USER}:${process.env.UBI_PASS}`
  ).toString("base64");

  const loggedIn = await login(credentials);

  if (loggedIn) {
    const totd = await getTOTD(loggedIn.nadeoTokens.accessToken);

    const availableMaps = totd.monthList[0].days.filter((day) => day.mapUid);
    const today = availableMaps.slice(-1);

    const map = await getMap(loggedIn.ubiTokens.accessToken, today[0].mapUid);

    const times = {
      author: msToM(map.authorScore),
      gold: msToM(map.goldScore),
      silver: msToM(map.silverScore),
      bronze: msToM(map.bronzeScore),
    };

    res.json({
      availableMaps,
      map,
      times,
    });
  } else {
    res.json({
      error: true,
    });
  }
};
