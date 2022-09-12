import SpotifyWebApi from 'spotify-web-api-node';
import config from '../database/config.js';
import { LocalStorage } from 'node-localstorage';
import dotenv from 'dotenv';
dotenv.config();


var scopes = ['playlist-modify-public'],
  redirectUri = 'https://example.com/callback',
  clientId = process.env.SPOTIFY_CLIENT_ID;
  // dont need state
  // state = 'some-state-of-my-choice';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes);

console.log(authorizeURL);