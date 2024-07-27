const { verify } = require("jsonwebtoken");
const { messageEmitter } = require("./messageEmitter");
const db = require('../database/Connection');
const ACCESSTOKEN = process.env.ACCESSTOKEN;

module.exports = (socket, io, groupSocketIds) => {
    socket.on('send', (data) => {
        const message = data.msg;
        const groupId = data.groupId;
        const accessToken = data.accessToken;
        if(!accessToken) {
            socket.broadcast.emit('error', { message: "You have logged out of your account!" });
            return;
        }
        socket.broadcast.emit('receive', { message: "message sent" });
    });
};
