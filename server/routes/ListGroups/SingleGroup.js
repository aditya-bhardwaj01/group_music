const express = require("express");
const router = express.Router();
const db = require('../../database/Connection')

const getAllMembers = (groupId) => {
    const query = "select displayName, status from members where groupId=?";
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
    const groupId = request.body.groupId;
    const accessToken = request.body.accessToken;
    if (!accessToken) {
        response.status(404).json("You have been logged out.");
        return;
    }

    try {
        members = await getAllMembers(groupId);
        response.status(200).json(members);
    } catch {
        response.status(500).json({ error: "Server Error" })
    }
})

module.exports = router;