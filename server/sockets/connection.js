let groupSocketIds = new Map();

module.exports = (socket, io) => {
    console.log('Connection established');

    // chat related communications
    require('./newUser')(socket, io, groupSocketIds);
    require('./removeUserFromCurrentGroup')(socket, io, groupSocketIds);
    require('./send')(socket, io, groupSocketIds);

    // playing music related communications
    require('./playMusic')(socket, io, groupSocketIds);

    require('./disconnect')(socket, io, groupSocketIds);
};
