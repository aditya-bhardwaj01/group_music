const express = require("express");
const router = express.Router();
const { verify } = require('jsonwebtoken');
const ACCESSTOKEN = process.env.ACCESSTOKEN
const db = require('../../database/Connection')

const verifyCredentials = () => {
    const query = ""
    db.query(query, [],
        (err, result) => {
            if (err) {
            }
            else {
            }
        })
}

router.post("/", (request, response) => {
    const groupId = request.body.groupId;
    const accessToken = request.body.accessToken;
    if (!accessToken) {
        response.status(404).json("You have been logged out.");
        return;
    }
    const validToken = verify(accessToken, ACCESSTOKEN);
    const userId = validToken.id;

    console.log(groupId)
    response.json("Hii")
})

module.exports = router;