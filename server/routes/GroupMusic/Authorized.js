const express = require("express");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const db = require('../../database/Connection')
const ACCESSTOKEN = process.env.ACCESSTOKEN

const isMember = (userId, groupName) => {
    const query = "select count(*) as count from members a inner join groupsData b on a.userId = ? and a.groupId = b.id and b.groupName = ?";
    const values = [userId, groupName];
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

const isOwner = (userId, groupName) => {
    const query = "select count(*) as count from groupsData where ownerId=? and groupName=?";
    const values = [userId, groupName];
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

router.post("/", async (request, response) => {
    const accessToken = request.body.accessToken;
    if (!accessToken) {
        response.status(404).json("You have been logged out.");
        return;
    }
    const validToken = verify(accessToken, ACCESSTOKEN);
    const userId = validToken.id;
    const groupName = request.body.groupName;

    try {
        const member = await isMember(userId, groupName);
        const owner = await isOwner(userId, groupName);
        response.status(200).json({isAuthentic: member | owner});
    } catch {
        response.status(500).json({ error: "Server Error" })
    }
})

module.exports = router;