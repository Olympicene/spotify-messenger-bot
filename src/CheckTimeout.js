import Timeout from './Timeout.js';
import {send} from '../index.js';

function checkTimeout(event) {
  let message = {};

  if (event.body == '!timeout') {
    if (!Timeout.inTimeout(event.senderID)) {
      message.body = 'You can add a song right now!';
      send(message, event.threadID, event.messageID);
    } else {
      message.body = `You can add a new song in ${Timeout.timeLeft(
        event.senderID
      )}`;
      send(message, event.threadID, event.messageID);
    }
  }
}

export default checkTimeout
