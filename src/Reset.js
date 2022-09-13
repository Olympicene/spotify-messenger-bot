import config from '../database/config.js';
import Timeout from './Timeout.js';
import send from '../index.js';

function reset(event) {
  let message = {};
  let adminIDs = config.admins;


  if (event.body == '!reset' && adminIDs.includes(event.senderID)) {
	let reset_num = Object.keys(Timeout.timeout).length;
	
	Timeout.clearTimeout();
    message.body = `Reset ${reset_num} people.`;
    send(message, event.threadID, event.messageID);
  }
}

export default reset;
