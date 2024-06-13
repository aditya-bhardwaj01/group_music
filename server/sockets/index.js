const chatHandler = require('./chat');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
        chatHandler(io, socket);

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};
