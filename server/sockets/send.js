const { verify } = require("jsonwebtoken");
const messageEmitter = require("./messageEmitter");
const db = require('../database/Connection');
const ACCESSTOKEN = process.env.ACCESSTOKEN;

const addMessageToDataBase = (message, senderId, senderName, groupId) => {
    const query = "INSERT INTO chatmessages (message, senderId, senderName, groupId, datetime) VALUES (?,?,?,?,?)";
    const values = [message, senderId, senderName, groupId, new Date()];
    return new Promise((resolve, reject) => {
        db.query(query, values,
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

module.exports = (socket, io, groupSocketIds) => {
    socket.on('sendMsg', async (data) => {
        const socketId = socket.id;
        const message = data.message;
        const senderName = data.displayName;
        const groupId = data.groupId;
        const accessToken = data.accessToken;
        if(!accessToken) {
            return;
        }
        const validToken = verify(accessToken, ACCESSTOKEN);
        const senderId = validToken.id;
        await addMessageToDataBase(message, senderId, senderName, groupId);
        messageEmitter(socket, groupSocketIds.get(groupId), 'receiveMsg', {
            message: message,
            senderName: senderName,
        }, socketId)
    });
};
