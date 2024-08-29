const messageEmitter = require("./messageEmitter");
const db = require('../database/Connection');

const setPlayMusicStatus = (isMusicPlaying, groupId) => {
    const query = "UPDATE groupmusicdetails set playing=? where groupId=?";
    const values = [isMusicPlaying ? 1 : 0, groupId];
    return new Promise((resolve, reject) => {
        db.query(query, values,
            (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            })
    })
}

module.exports = (socket, io, groupSocketIds) => {
    socket.on('changeMusicPlayStatus', async (data) => {
        const isMusicPlaying = data.isMusicPlaying;
        const groupId = data.groupId;
        await setPlayMusicStatus(isMusicPlaying, groupId);
        messageEmitter(socket, groupSocketIds.get(groupId), 'musicPlayStatusChanged', {isMusicPlaying: isMusicPlaying}, socket.id);
    });
};