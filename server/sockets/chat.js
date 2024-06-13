module.exports = (io, socket) => {
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message', msg); // Broadcast message to all connected clients
    });
};
