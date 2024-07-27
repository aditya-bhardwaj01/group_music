const socketHandlers = (io) => {
    io.on('connection', (socket) => {
        require('./connection')(socket, io);
    });
};

module.exports = socketHandlers;
