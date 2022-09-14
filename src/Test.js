import config from '../database/config.js';
import Timeout from './Timeout.js';
import { send, api } from '../index.js';
import { promisify } from 'es6-promisify';

async function test(event) {
  let message = {};
  let adminIDs = config.admins;

  if (event.body == '!test' && adminIDs.includes(event.senderID)) {
    
  }
}

export default test;
