import config from '../database/config.js';
import Timeout from './Timeout.js';
import {send, api} from '../index.js';
import { promisify } from 'es6-promisify';



async function test(event) {
  let message = {};
  let adminIDs = config.admins;
  const getThreadPromise = promisify(api.getThreadList)



  if (event.body == '!test' && adminIDs.includes(event.senderID)) {

	let threadIDs = (await getThreadPromise(10, null, [])).map((a) => a.threadID);
	console.log(threadIDs)

	//console.log(info)
	//let message = {};
	//message.body = `It's a new day! You can now add a song.`

	//for (const id in config.allowed_threads) {
	//	await send(message, id);
	//}
  }
}

export default test;
