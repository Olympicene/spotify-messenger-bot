//time in between commands
const apiOptions = {
  listenEvents: true,
  selfListen: true,
  forceLogin: true,
};

//threadIDs of groupchats/chats its allowed in
const allowed_threads = [
  "100085302326637",
  "2401681243197992",
  "5550431638347613",
  "5008172842621887",
];

const admins = [
  "100085302326637",
  "100066164221694",
]

const time_zone = 'America/Chicago';

const playlist_ID = '39me5uTuDeAC6jl0f2dM5c';

const DEBUG = false;

const timeout_milliseconds = 86400000;

export default {time_zone, admins, apiOptions, allowed_threads, DEBUG, playlist_ID, timeout_milliseconds}