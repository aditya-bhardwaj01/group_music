let groupSocketIds = new Map();

module.exports = (socket, io) => {
    console.log('Connection established');

    require('./newUser')(socket, io, groupSocketIds);
    require('./removeUserFromCurrentGroup')(socket, io, groupSocketIds);
    require('./send')(socket, io, groupSocketIds);
    require('./disconnect')(socket, io, groupSocketIds);
};
