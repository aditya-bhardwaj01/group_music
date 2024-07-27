const updateActiveStatus = require('./utils/updateActiveStatus');

module.exports = (socket, io, groupSocketIds) => {
    socket.on('disconnect', () => {
        console.log("disconnected - " + socket.id);
        const socketId = socket.id;

        for (let [key, array] of groupSocketIds) {
            const index = array.findIndex(entry => entry.socketId === socketId);
            if (index !== -1) {
                // console.log(key, groupSocketIds.get(key)[index].userId);
                updateActiveStatus(key, groupSocketIds.get(key)[index].userId);
                array.splice(index, 1);
                if (array.length === 0) {
                    groupSocketIds.delete(key);
                } else {
                    groupSocketIds.set(key, array);
                }
            }
        }
    });
};
