const express = require("express");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const db = require('../../database/Connection')
const ACCESSTOKEN = process.env.ACCESSTOKEN

const fetchGroupData = (userId) => {
    const query = "select * from groupsdata where ownerId = ? order by dateCreated desc";
    const values = [userId];
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

    try {
        const groupData = await fetchGroupData(userId);
        response.status(200).json(groupData);
    } catch {
        response.status(500).json({ error: "Server Error" })
    }
})

module.exports = router;