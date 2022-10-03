import appRoot from 'app-root-path';
import download from 'download';
import config from '../database/config.js';
import getSpotifyToken from './SpotifyLogin.js';
import Timeout from './Timeout.js';
import { send } from '../index.js';
import fs from 'fs';

function isValidUrl(urlString) {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
}

//you better comment this later man
async function addToPlaylist(event) {
  let message = {};

  if (isValidUrl(event.body)) {
    let message = {};
    const url = new URL(event.body);
    const id = url.pathname.split('/').at(-1);
    const path_type = url.pathname.split('/').at(1);

    if (url.hostname == 'open.spotify.com' && id.length == 22) {
      if (path_type == 'track') {
        if (!Timeout.inTimeout(event.senderID)) {
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

            if (!config.minimal.includes(event.threadID)) {
              try {
                let image = track.album.images[1].url;

                try {
                  fs.unlinkSync(`${appRoot}/image.png`);
                } catch (error) {}

                fs.writeFileSync(
                  `${appRoot}/image.png`,
                  await download(image),
                  {
                    flag: 'w',
                  }
                );

                message.attachment = [
                  fs.createReadStream(`${appRoot}/image.png`),
                ];
                await send(message, event.threadID, event.messageID);
              } catch (error) {
                console.log(error);
              }

              Timeout.userTimeout(event.senderID);

              try {
                message = {};
                let audio = track.preview_url;

                try {
                  fs.unlinkSync(`${appRoot}/audio.mp3`);
                } catch (error) {}
                fs.writeFileSync(
                  `${appRoot}/audio.mp3`,
                  await download(audio),
                  {
                    flag: 'w',
                  }
                );

                message.attachment = [
                  fs.createReadStream(`${appRoot}/audio.mp3`),
                ];
                await send(message, event.threadID);
              } catch (error) {
                console.log(error);
              }
            } else {
              try {
                let audio = track.preview_url;

                try {
                  fs.unlinkSync(`${appRoot}/audio.mp3`);
                } catch (error) {}
                fs.writeFileSync(
                  `${appRoot}/audio.mp3`,
                  await download(audio),
                  {
                    flag: 'w',
                  }
                );

                message.attachment = [
                  fs.createReadStream(`${appRoot}/audio.mp3`),
                ];
                await send(message, event.threadID);
              } catch (error) {
                console.log(error);
                await send(message, event.threadID);
              }
            }
          } catch (error) {
            message = {};
            message.body =
              'There was an error adding your song. Please check the logs.';
            send(message, event.threadID, event.messageID);
            console.error(error);
          }
        } else {
          message = {};
          message.body = `Sorry you're still in timeout, you can add a new song in ${Timeout.timeLeft(
            event.senderID
          )}`;
          send(message, event.threadID, event.messageID);
        }
      } else {
        message = {};
        message.body = `We can't accept this ${path_type}.`;
        send(message, event.threadID, event.messageID);
      }
    }
  }
}

export default addToPlaylist;
