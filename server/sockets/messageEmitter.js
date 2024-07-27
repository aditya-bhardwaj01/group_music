const messageEmitter = (socket, members, emitType, data, mySocketId) => {
    if(!members) return;
    members.forEach(member => {
        if(member.socketId !== mySocketId) socket.to(member.socketId).emit(emitType, { message: data });
    });
}

module.exports = messageEmitter;