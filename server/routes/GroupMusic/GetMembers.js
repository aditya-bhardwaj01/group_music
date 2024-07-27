const express = require("express");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const db = require('../../database/Connection');
const ACCESSTOKEN = process.env.ACCESSTOKEN;

const getOwner = (groupId) => {
    const query = "select ownerId as userId, displayName, status from groupsdata where id=?";
    const values = [groupId];

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
    });
}

const groupMembers = (groupId) => {
    const query = "select userId, displayName, status from members where groupId=?";
    const values = [groupId];

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
    });
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

    try {
        const owner = await getOwner(groupId);
        const members = await groupMembers(groupId);
        const isOwner = (owner[0].userId === userId);
        response.status(200).json({owner: owner, members: members, isOwner: isOwner, userId: userId});
    } catch {
        response.status(500).json({ error: "Server Error" });
    }
})

module.exports = router;