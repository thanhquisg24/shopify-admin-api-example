import axios from 'axios';
import dotenv from 'dotenv';
import qs from 'qs';

dotenv.config();

interface IGaponeToken {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number; //in seconds
}

const CLIENT_ID = process.env.GAPONE_CLIENT_ID || null;
const CLIENT_SERECT = process.env.GAPONE_CLIENT_SERECT || null;

let _RefreshTokenTimeStamp: number = 0;
let _AccessToken: string | null = null;

function isExpiredToken(refreshTimeStamp: number): boolean {
  const start = Date.now();
  console.log(
    '🚀 ~ file: axios-ins.ts:21 ~ isExpiredToken ~ isExpiredToken:',
    start,
    refreshTimeStamp,
    start - refreshTimeStamp,
  );
  if (start > refreshTimeStamp) {
    _AccessToken = null;
    return true;
  }
  return false;
}
function updateRefreshToken(gaponToken: IGaponeToken) {
  const msExpriesIn = Number(gaponToken.expires_in) * 1000;
  _RefreshTokenTimeStamp = Date.now() + msExpriesIn;
  _AccessToken = gaponToken.access_token;
  // console.log(
  //   '🚀 ~ file: axios-ins.ts:36 ~ updateRefreshToken ~ _AccessToken:',
  //   _AccessToken,
  // );
}

const AxiosIns = axios.create({});
AxiosIns.defaults.headers['Content-Type'] = 'application/json';

const getAccessToken = async (): Promise<IGaponeToken> => {
  const data = qs.stringify({
    grant_type: 'client_credentials',
    scope: 'gateway',
  });
  const config = {
    method: 'post',
    url: 'https://auth.gapone.vn/token',
    auth: {
      username: CLIENT_ID,
      password: CLIENT_SERECT,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };
  const resData = await axios(config);
  return resData.data;
};

AxiosIns.interceptors.request.use(
  async (config) => {
    config.headers.Authorization;
    if (isExpiredToken(_RefreshTokenTimeStamp)) {
      const t = await getAccessToken();
      config.headers.Authorization = `Bearer ${t.access_token}`;
      updateRefreshToken(t);
    } else if (_AccessToken) {
      config.headers.Authorization = `Bearer ${_AccessToken}`;
    }
    return config;
  },
  (error) => {
    console.log('🚀 ~ file: axios-ins.ts:66 ~ error:', error);
    Promise.reject(error);
  },
);

export default AxiosIns;
