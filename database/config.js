//time in between commands
const apiOptions = {
  listenEvents: true,
  selfListen: true,
  forceLogin: true,
};

//threadIDs of groupchats/chats its allowed in
const allowed_threads = [
  "100085491676984",
];

const DEBUG = true;

export default {apiOptions, allowed_threads, DEBUG}
