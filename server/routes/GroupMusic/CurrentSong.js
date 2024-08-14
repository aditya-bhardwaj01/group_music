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

const setCurrentSong = (groupId, songImage, songName) => {
    const query = "UPDATE groupsdata SET songImage=?, songName=? WHERE id=?";
    const values = [songImage, songName, groupId];
    return new Promise((resolve, reject) => {
        db.query(query, values,
            (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
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
        response.status(200).json(currentSong);
    } catch {
        response.status(500).json({ error: "Server Error" })
    }
})

router.post("/setSong", async (request, response) => {
    const accessToken = request.body.accessToken;
    if(!accessToken) {
        response.status(404).json("You have been logged out.");
        return;
    }
    const groupId = request.body.groupId;
    const songImage = request.body.songImage;
    const songName = request.body.songName;

    try {
        await setCurrentSong(groupId, songImage, songName);
        response.status(200).json("Song set successfully");
    } catch {
        response.status(500).json({ error: "Server Error" });
    }
})

module.exports = router;