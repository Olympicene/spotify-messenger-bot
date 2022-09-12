import config from '../database/config.js';
import getSpotifyToken from './SpotifyLogin.js';

async function EventHandler(event, api) {
	let threadIDs = config.allowed_threads;

	if (threadIDs.includes(event.threadID) && event.type == 'message') {
		console.log(event);

		const spotifyApi = await getSpotifyToken();
		var playlist = await spotifyApi.addTracksToPlaylist(config.playlist_ID, [`spotify:track:${event.body}`]) 

		console.log(playlist);
	}
}

export default EventHandler;
