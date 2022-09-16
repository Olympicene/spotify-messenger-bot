import config from '../database/config.js';
import addToPlaylist from './AddToPlaylist.js';
import checkTimeout from './CheckTimeout.js';
import linkToPlaylist from './LinkToPlaylist.js';
import help from './Help.js';
import reset from './Reset.js';
import test from './Test.js';
import debug from './Debug.js';


async function EventHandler(event) {
  let threadIDs = config.allowed_threads;

  //check if thread is valid X
  //check if is a text message X
  //check if entire message is valid url X
  //check if url is a spotify url X
  //check if song id is valid 22 characters X
  //add song X
  //send message that is was added
  //when you can add next if try to send another one or do "!timeout"

  if (threadIDs.includes(event.threadID) && event.type == 'message') {
    addToPlaylist(event);
    checkTimeout(event);
    linkToPlaylist(event);
    help(event);
    reset(event);
    test(event);
    debug(event);
  }
}

export default EventHandler;
