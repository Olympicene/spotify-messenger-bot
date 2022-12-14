import config from '../database/config.js';
import {send} from '../index.js';

function help(event) {
  let message = {};

  if (event.body == '!help') {
    message.body = 
    `Commands:
    !help - list of commands
    !link - link to playlist
    !timeout - check if you are in timeout
    [spotify link] - add song to playlist
    \n
    Admin-Only Commands:
    !debug - show list of timeout ids
    [debug object] - change timeout id object
    `;
    send(message, event.threadID, event.messageID);
  }
}

export default help;
