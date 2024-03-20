const express = require("express");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const db = require('../../database/Connection')
const ACCESSTOKEN = process.env.ACCESSTOKEN

const getGroupId = (secretCode) => {
    const query = "select id, groupName, ownerId from groupsdata where  groupSecretCode=?";
    const values = [secretCode]
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

const userExist = (userId, groupId) => {
    const query = "select * from members where userId=? and groupId=?";
    const values = [userId, groupId];
    return new Promise((resolve, reject) => {
        db.query(query, values,
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.length > 0);
                }
            })
    })
}

const insertUser = (userId, groupId, displayName) => {
    const query = "INSERT INTO members (userId, groupId, displayName, status) VALUES (?,?,?,?)";
    const values = [userId, groupId, displayName, 1];
    return new Promise((resolve, reject) => {
        db.query(query, values,
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
    })
}


router.post("/", async (request, response) => {
    const secretCode = request.body.secretCode;
    const displayName = request.body.displayName;
    const accessToken = request.body.accessToken;

    const validToken = verify(accessToken, ACCESSTOKEN);
    const userId = validToken.id;

    let group = -1;
    let groupName = '';

    // Check if any such group exist. If it does we store the id of that group
    try {
        const groupDetail = await getGroupId(secretCode);
        // console.log(groupDetail[0].ownerId, userId);
        // console.log(groupDetail[0].ownerId === userId)
        if (groupDetail.length === 0) {
            response.status(400).json({ error: "Wrong secret code!" });
        } else if (groupDetail[0].ownerId === userId) {
            response.status(400).json({ error: "You are already in this group!" })
        } else {
            group = groupDetail[0].id;
            groupName = groupDetail[0].groupName;
        }
    } catch {
        response.status(500).json({ error: "Server error!" });
    }

    // console.log(group, groupName)
    // Check if the user already exist in the group
    var exist = -1;
    if (group !== -1) {
        try {
            exist = await userExist(userId, group) ? 1 : 0;
            if (exist) {
                response.status(400).json({ error: "You are already in this group!" });
            }
        } catch {
            response.status(500).json({ error: "Server error!" });
        }
    }
    
    // Insert group member
    if (exist === 0) {
        try {
            await insertUser(userId, group, displayName);
            response.status(200).json({ groupName: groupName });
        } catch {
            response.status(500).json({ error: "Server error!" });
        }
    }

})

module.exports = router;