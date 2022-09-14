import appRoot from 'app-root-path';
import { promisify } from 'es6-promisify';
import config from './database/config.js';
import EventHandler from './src/EventHandler.js';
import Timeout from './src/Timeout.js';
import FBchat from 'facebook-chat-api';
import schedule from 'node-schedule'
import fs from 'fs';

//promisify login
const login = promisify(FBchat);
const appstate = JSON.parse(fs.readFileSync(appRoot + '/database/appstate.json', 'utf8'));

//login
const api = await login({ appState: appstate }).catch((err) => {
  console.error(err);
});

//settings
api.setOptions(config.apiOptions);

//listener
api.listenMqtt((err, event) => {
  if (err) return console.error(err);

  if (config.DEBUG) console.log(event);

  EventHandler(event);
});

//reset timeout every night
const getThreadPromise = promisify(api.getThreadList)

schedule.scheduleJob('0 0 * * *', async () => {
	//reset timer
	Timeout.clearTimeout();

	message = {body: `It's a new day! You can now add a song.`};

    //available threads
    let threadIDs = (await getThreadPromise(10, null, [])).map(
      (a) => a.threadID
    );

    for (const id of config.allowed_threads) {
      if (threadIDs.includes(id)) {
        send(message, id);
      }
    }
})


//helpful send function
function send(contents, threadID, replyID) {
	new Promise((resolve, reject) => {
	  api.sendMessage(contents, threadID, (err) => {
		  if (err) {
			reject(err);
			return;
		  }
  
		  resolve(`message sent`);
		}, replyID);
	});
  }

export {send, api};