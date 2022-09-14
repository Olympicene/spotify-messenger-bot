import config from '../database/config.js';
import {send} from '../index.js';

function linkToPlaylist(event) {
	let message = {};
  
	if (event.body == '!link') {
		message.body = `https://open.spotify.com/playlist/${config.playlist_ID}`
		send(message, event.threadID, event.messageID);
	}
  }

  export default linkToPlaylist