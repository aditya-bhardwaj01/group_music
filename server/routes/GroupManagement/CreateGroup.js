const express = require("express");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const db = require('../../database/Connection')
const ACCESSTOKEN = process.env.ACCESSTOKEN

const query = "";

router.post("/", (request, response) => {
    const groupName = request.body.groupName;
    const displayName = request.body.displayName;
    const accessToken = request.body.accessToken;
    
    const validToken = verify(accessToken, ACCESSTOKEN);
    const userId = validToken.id;

    response.json("hii");

    // db.query(query, values, (error, result) => {
    //     if (error) {
    //         response.status(500).json({ error: "Server error!" });
    //     } else {
    //         response.status(200).send("account_successfully_created");
    //     }
    // }
    // )

})

module.exports = router;