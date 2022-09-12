import appRoot from 'app-root-path';
import download from 'download';
import config from '../database/config.js';
import getSpotifyToken from './SpotifyLogin.js';
import send from '../index.js';
import fs from 'fs';

function isValidUrl(urlString) {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
}

async function EventHandler(event, api) {
  let threadIDs = config.allowed_threads;

  //check if thread is valid X
  //check if is a text message X
  //check if entire message is valid url X
  //check if url is a spotify url X
  //check if song id is valid 22 characters X
  //add song X
  //send message that is was added
  //when you can add next if try to send another one or do "!timeout"

  if (
    threadIDs.includes(event.threadID) &&
    event.type == 'message' &&
    isValidUrl(event.body)
  ) {
    let message = {};
    const url = new URL(event.body);
    const id = url.pathname.split('/').at(-1);

    if (url.hostname == 'open.spotify.com' && id.length == 22) {
      try {
        const spotifyApi = await getSpotifyToken();
        await spotifyApi.addTracksToPlaylist(config.playlist_ID, [
          `spotify:track:${id}`,
        ]);

        let info = await spotifyApi.getTracks([id]);
        let track = info.body.tracks[0];

        if (config.DEBUG) console.log(track);


        //https://stackoverflow.com/a/46694321 create list of sub properties
        let artists = track.artists.map((a) => a.name).join(', ');

        message.body = `Added \"${track.name}\" by ${artists}`;

        try {
          let image = track.album.images[1].url;


          fs.unlinkSync(`${appRoot}/image.png`);
          fs.writeFileSync(`${appRoot}/image.png`, await download(image), {
            flag: 'w',
          });

          message.attachment = [fs.createReadStream(`${appRoot}/image.png`)];
          await send(message, event.threadID, event.messageID);

        } catch (error) {
          console.error(error);
        }

        try {
          message = {};
          let audio = track.preview_url;

          fs.unlinkSync(`${appRoot}/audio.mp3`);
          fs.writeFileSync(`${appRoot}/audio.mp3`, await download(audio), {
            flag: 'w',
          });

          message.attachment = [fs.createReadStream(`${appRoot}/audio.mp3`)];
          await send(message, event.threadID);

        } catch (error) {
          console.error(error);
        }

      } catch (error) {
        message.body =
          'There was an error adding your song. Please check the logs.';
        send(message, event.threadID, event.messageID);
      }
    }
  }
}

export default EventHandler;
