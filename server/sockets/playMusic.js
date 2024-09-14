const messageEmitter = require("./messageEmitter");
const db = require('../database/Connection');

const setCurrentMusic = (trackId, artistId, groupId, type) => {
    let query = "UPDATE groupmusicdetails SET musicId=?, artistId=? WHERE groupId=?";
    let values = [trackId, artistId, groupId];
    if(type === 2) {
        query = "INSERT INTO groupmusicdetails (musicId, groupId, playing, artistId) VALUES (?,?,?,?)";
        values = [trackId, groupId, 1, artistId];
    }

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
        const artistId = data.artistId;
        const groupId = data.groupId;
        const res = await setCurrentMusic(trackId, artistId, groupId, 1);
        if(res.affectedRows === 0) {
            await setCurrentMusic(trackId, artistId, groupId, 2);
        }
        messageEmitter(socket, groupSocketIds.get(groupId), 'currentMusic', {trackId: trackId}, socket.id);
    });
};