import config from '../database/config.js';
import Timeout from './Timeout.js';
import { send, api } from '../index.js';
import { promisify } from 'es6-promisify';

async function editTimeout(event) {
  let message = {};
  let adminIDs = config.admins;

  if (
    event.body.charAt(0) == '{' &&
    event.body.charAt(event.body.length - 1) == '}' &&
    adminIDs.includes(event.senderID)
  ) {
    Timeout.editTimeout(JSON.parse(event.body));
    message.body = `Changed Timeout.`;

    send(message, event.threadID, event.messageID);
  }
}

export default editTimeout;
