const express = require("express");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const db = require('../../database/Connection')
const ACCESSTOKEN = process.env.ACCESSTOKEN

// Check if the user is a member of that group
const isMember = (userId, groupName, groupId) => {
    const query = "select count(*) as count from members a inner join groupsData b on a.userId = ? and a.groupId = b.id and b.groupName = ? and b.id=?";
    const values = [userId, groupName, groupId];
    return new Promise((resolve, reject) => {
        db.query(query, values,
            (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result[0].count >= 1);
                }
            })
    })
}

// Check if the user is the owner of that group
const isOwner = (userId, groupName, groupId) => {
    const query = "select count(*) as count from groupsData where ownerId=? and groupName=? and id=?";
    const values = [userId, groupName, groupId];
    return new Promise((resolve, reject) => {
        db.query(query, values,
            (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result[0].count >= 1);
                }
            })
    })
}

// Get the display name of the user if he belongs to the group in any manner.
const getDisplayName = (type, userId, groupName, groupId) => {
    let query = "select a.displayName as displayName from members a inner join groupsData b on a.userId=? and a.groupId = b.id and b.groupName=? and b.id=?";
    if(type === 'owner') {
        query = "select displayName from groupsData where ownerId=? and groupName=? and id=?";
    }
    const values = [userId, groupName, groupId];
    return new Promise((resolve, reject) => {
        db.query(query, values,
            (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result[0].displayName);
                }
            })
    })
}


const setUserActive = (type, userId, groupId) => {
    let query = "UPDATE members SET status=? WHERE userId=? and groupId=?";
    if(type === 'owner') {
        query = "UPDATE groupsData SET status=? WHERE ownerId=? and id=?"
    }
    const values = [1, userId, groupId];
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

router.post("/", async (request, response) => {
    const accessToken = request.body.accessToken;
    if (!accessToken) {
        response.status(404).json("You have been logged out.");
        return;
    }
    const validToken = verify(accessToken, ACCESSTOKEN);
    const userId = validToken.id;
    const groupId = request.body.groupId;
    const groupName = request.body.groupName;

    try {
        const member = await isMember(userId, groupName, groupId);
        if(member) {
            const displayName = await getDisplayName('member', userId, groupName, groupId);
            await setUserActive('member', userId, groupId);
            response.status(200).json({isAuthentic: true, displayName: displayName});
        } else {
            const owner = await isOwner(userId, groupName, groupId);
            if(owner) {
                const displayName = await getDisplayName('owner', userId, groupName, groupId);
                await setUserActive('owner', userId, groupId);
                response.status(200).json({isAuthentic: true, displayName: displayName});
            } else {
                response.status(200).json({isAuthentic: false});
            }
        }
    } catch {
        response.status(500).json({ error: "Server Error" })
    }
})

module.exports = router;