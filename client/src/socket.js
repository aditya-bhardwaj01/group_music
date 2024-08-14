// socket.js

import { io } from 'socket.io-client';
import { backendBaseURL } from './backendBaseURL';

const socket = io(`${backendBaseURL}`);

export default socket;
