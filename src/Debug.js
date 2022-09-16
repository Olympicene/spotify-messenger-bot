import config from '../database/config.js';
import Timeout from './Timeout.js';
import {send} from '../index.js';

function debug(event) {
  let message = {};
  let adminIDs = config.admins;


  if (event.body == '!debug' && adminIDs.includes(event.senderID)) {
	message.body = 
	`Peek Timeout
	${Timeout.peek()}`

	send(message, event.threadID, event.messageID);
  }
}

export default debug;
