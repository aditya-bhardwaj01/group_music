const { verify } = require("jsonwebtoken");
const messageEmitter = require("./messageEmitter");
const ACCESSTOKEN = process.env.ACCESSTOKEN;

const userIdExistsInGroup = (groupId, userId, groupSocketIds) => {
    if (!groupSocketIds.has(groupId)) {
        return false;
    }
    return groupSocketIds.get(groupId).some(user => user.userId === userId);
}

const updateSocketId = (groupId, userId, newSocketId, groupSocketIds) => {
    if (!groupSocketIds.has(groupId)) {
        console.log(`Group ${groupId} does not exist.`);
        return;
    }

    let array = groupSocketIds.get(groupId);
    let entry = array.find(entry => entry.userId === userId);

    entry.socketId = newSocketId;
    groupSocketIds.set(groupId, array);
}

module.exports = (socket, io, groupSocketIds) => {
    socket.on('newUser', (data) => {
        const socketId = socket.id;
        const displayName = data.displayName;
        const groupId = data.groupId;
        const accessToken = data.accessToken;
        if(!accessToken) {
            socket.broadcast.emit('error', { message: "You have logged out of your account!" });
            return;
        }

        if (!groupSocketIds.has(groupId)) {
            groupSocketIds.set(groupId, []);
        }
        const validToken = verify(accessToken, ACCESSTOKEN);
        const userId = validToken.id;

        // If for that groupId the userId does not exist just add that userId to that groupId
        if(!userIdExistsInGroup(groupId, userId, groupSocketIds)) {
            groupSocketIds.get(groupId).push({socketId, displayName, userId});
            messageEmitter(socket, groupSocketIds.get(groupId), 'userJoined', `${displayName} joined the chat`, socketId);
        }
        // If for that groupId the userId already exists just update the socketId
        else {
            updateSocketId(groupId, userId, socketId, groupSocketIds);
            messageEmitter(socket, groupSocketIds.get(groupId), 'userJoined', `${displayName} joined the chat`, socketId);
        }
        // console.log(groupSocketIds);
    });
};
