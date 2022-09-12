import config from '../database/config.js';

class Timeout {

    static time = config.timeout_milliseconds;
    static timeout = {};

    static inTimeout(userID) { //check if threadID is in timeout
        return this.timeout[userID] == 0 || this.timeout[userID] === undefined ? false : true;
    }

    static userTimeout(userID) { //puts thread id in timeout
        this.timeout[userID] = Date.now() + this.time;
        setTimeout(() => {this.timeout[userID] = 0;}, this.time);
    }

	//TODO: check if actually in timeout first
	static timeLeft(userID) {
		//https://bobbyhadz.com/blog/javascript-convert-milliseconds-to-hours-minutes-seconds
		return new Date(this.timeout[userID] - Date.now()).toISOString().slice(11, 19);
	}
}

export default Timeout;
