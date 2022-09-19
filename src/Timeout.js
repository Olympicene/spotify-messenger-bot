import config from '../database/config.js';

class Timeout {

    static time = config.timeout_milliseconds;
    static timeout = {};

    static inTimeout(userID) { //check if threadID is in timeout
        return this.timeout[userID] === undefined ? false : true;
    }

    static userTimeout(userID) { //puts thread id in timeout
        this.timeout[userID] = Date.now();
    }

	//TODO: check if actually in timeout first
	static timeLeft(userID) {
        var next_midnight = new Date();
        next_midnight.toLocaleString('en-US', { timeZone: config.time_zone })
        next_midnight.setHours(24,0,0,0);

		//https://bobbyhadz.com/blog/javascript-convert-milliseconds-to-hours-minutes-seconds
		let CST = new Date(new Date().toLocaleString('en-US', { timeZone: config.time_zone }))
        return new Date(next_midnight - CST).toISOString().slice(11, 19);
	}

    static clearTimeout() {
        this.timeout = {};
    }

    static editTimeout(timeout) {
        this.timeout = timeout;
    }

    static peek() {
        return JSON.stringify(this.timeout);
    }
}

export default Timeout;
