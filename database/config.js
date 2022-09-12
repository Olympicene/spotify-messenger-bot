//time in between commands
const apiOptions = {
  listenEvents: true,
  selfListen: true,
  forceLogin: true,
};

//threadIDs of groupchats/chats its allowed in
const allowed_threads = [
  "100085302326637",
];

const playlist_ID = '3ntpIImhrnrk0lWLCCLtDU';

const DEBUG = false;

const timeout_milliseconds = 86400000;

export default {apiOptions, allowed_threads, DEBUG, playlist_ID, timeout_milliseconds}
