const db = require('../../database/Connection');

const inactiveOwner = (groupId, userId) => {
    const query = "UPDATE groupsdata SET status=? WHERE id=? AND ownerId=?";
    const values = [0, groupId, userId];
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

const inactiveMember = (groupId, userId) => {
    const query = "UPDATE members SET status=? WHERE groupId=? AND userId=?";
    const values = [0, groupId, userId];
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

const updateActiveStatus = (groupId, userId) => {
    try {
        inactiveOwner(groupId, userId);
    } catch (error) {
        console.warn(error);
    }

    try {
        inactiveMember(groupId, userId);
    } catch (error) {
        console.warn(error);
    }
}

module.exports = updateActiveStatus;