const express = require("express");
const router = express.Router();
const db = require('../../database/Connection')

const getCurrentSong = (groupId) => {
    const query = "SELECT musicId FROM groupmusicdetails WHERE groupId=?";
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
    })
}

router.post("/getSong", async (request, response) => {
    const accessToken = request.body.accessToken;
    if (!accessToken) {
        response.status(404).json("You have been logged out.");
        return;
    }
    const groupId = request.body.groupId;

    try {
        const currentSong = await getCurrentSong(groupId);
        console.log(currentSong);
        response.status(200).json(currentSong);
    } catch {
        response.status(500).json({ error: "Server Error" })
    }
})

module.exports = router;