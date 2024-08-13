const messageEmitter = require("./messageEmitter");
const db = require('../database/Connection');

const setCurrentMusic = (trackId, groupId, type) => {
    let query = "UPDATE groupmusicdetails SET musicId=? WHERE groupId=?";
    if(type === 2) query = "INSERT INTO groupmusicdetails (musicId, groupId) VALUES (?,?)";
    const values = [trackId, groupId];
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
    socket.on('playMusic', async (data) => {
        const trackId = data.trackId;
        const groupId = data.groupId;
        const res = await setCurrentMusic(trackId, groupId, 1);
        if(res.affectedRows === 0) {
            await setCurrentMusic(trackId, groupId, 2);
        }
        messageEmitter(socket, groupSocketIds.get(groupId), 'currentMusic', {trackId: trackId}, socket.id);
    });
};