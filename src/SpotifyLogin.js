import SpotifyWebApi from 'spotify-web-api-node';
import config from '../database/config.js';
import { LocalStorage } from 'node-localstorage';
import dotenv from 'dotenv';

let localStorage = new LocalStorage('./scratch');
dotenv.config();

function currentTime() {
  return Math.floor(Date.now() / 1000);
}

async function getSpotifyToken() {
  //initialze object
  let data, expire_date;
  let credentials = {
    redirectUri: 'https://example.com/callback',
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  };

  let spotifyApi = new SpotifyWebApi(credentials); //login credentials

  //if token does not exist
  if (localStorage.getItem('SPOTIFY_REFRESH_TOKEN') === null) { 
    try {
      data = await spotifyApi.authorizationCodeGrant(process.env.SPOTIFY_AUTH_CODE);

      console.log(data)

      localStorage.setItem('SPOTIFY_ACCESS_TOKEN', data.body['access_token']);

      localStorage.setItem('SPOTIFY_REFRESH_TOKEN', data.body['refresh_token']);

      expire_date = currentTime() + data.body['expires_in'];
      localStorage.setItem('SPOTIFY_TOKEN_EXPIRE_TIME', expire_date);

      await spotifyApi.setRefreshToken(localStorage.getItem(`SPOTIFY_REFRESH_TOKEN`)); //set access token

    } catch (err) {
      console.error(`Could not get create new credentials: ${err}`);
    }

  //if token has expired
  } else if (currentTime() > parseInt(localStorage.getItem('SPOTIFY_TOKEN_EXPIRE_TIME'))) {
    console.log('attempting to refresh token.')
    try {
      let credentials = {
        redirectUri: 'https://example.com/callback',
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        refreshToken: localStorage.getItem(`SPOTIFY_REFRESH_TOKEN`),
      };

      spotifyApi = new SpotifyWebApi(credentials);
      
      data = await spotifyApi.refreshAccessToken();
      localStorage.setItem('SPOTIFY_ACCESS_TOKEN', data.body['access_token']);
      
      expire_date = currentTime() + data.body['expires_in'];
      localStorage.setItem('SPOTIFY_TOKEN_EXPIRE_TIME', expire_date);

      console.log('successfully refreshed token.')

    } catch (err) {
      console.error(`Could not get refresh access token: ${err}`);
    }
  }

  await spotifyApi.setAccessToken(localStorage.getItem(`SPOTIFY_ACCESS_TOKEN`)); //set access token


  return spotifyApi;
}

export default getSpotifyToken;
