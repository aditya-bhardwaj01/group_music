const express = require("express");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const db = require('../../database/Connection')
const ACCESSTOKEN = process.env.ACCESSTOKEN

const getGroupMessages = (groupId) => {
    const query = "SELECT message, senderId, senderName, dateTime FROM chatmessages WHERE groupId=?";
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

const transformMessage = (messages, userId) => {
    for(let i=0; i<messages.length; i++) {
        if(messages[i].senderId === userId) {
            messages[i].myMessage = true;
        } else {
            messages[i].myMessage = false;
        }
        delete messages[i].senderId;
    }
    return messages;
}

router.post("/", async (request, response) => {
    const groupId = request.body.groupId;
    const accessToken = request.body.accessToken;
    if (!accessToken) {
        response.status(404).json("You have been logged out.");
        return;
    }
    const validToken = verify(accessToken, ACCESSTOKEN);
    const userId = validToken.id;

    try {
        const messages = await getGroupMessages(groupId);
        transformMessage(messages, userId);
        response.status(200).json({ messages: messages });
    } catch {
        response.status(500).json({ error: "Server Error" })
    }
})

module.exports = router;