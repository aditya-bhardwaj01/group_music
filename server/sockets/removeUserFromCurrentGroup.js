const { verify } = require("jsonwebtoken");
const messageEmitter = require("./messageEmitter");
const updateActiveStatus = require("./utils/updateActiveStatus");
const ACCESSTOKEN = process.env.ACCESSTOKEN;

module.exports = (socket, io, groupSocketIds) => {
    socket.on('removeUserFromCurrentGroup', (data) => {
        const socketId = socket.id;
        const groupId = data.groupId;
        const accessToken = data.accessToken;
        if (!accessToken) {
            return;
        }

        const validToken = verify(accessToken, ACCESSTOKEN);
        const userId = validToken.id;

        if (groupSocketIds.has(groupId)) {
            const usersArray = groupSocketIds.get(groupId);

            const updatedArray = usersArray.filter(user => !(user.socketId === socketId && user.userId === userId));
            const found = usersArray.some(user => user.userId === userId && user.socketId === socketId);
            if (found === true) {
                updateActiveStatus(groupId, userId);
            }
            if (updatedArray.length === 0) {
                groupSocketIds.delete(groupId);
            } else {
                groupSocketIds.set(groupId, updatedArray);
            }
        }

        // console.log(groupSocketIds);
        messageEmitter(socket, groupSocketIds.get(groupId), 'removedUser', 'User successfull removed from current group.', socketId);
    });
};
