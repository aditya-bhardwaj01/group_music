const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require('../../database/Connection')

const query = "update users set password=? where emailId=?";

router.post("/", (request, response) => {
    const emailId = request.body.email;
    const password = request.body.password;

    bcrypt.hash(password, 10).then((hash) => {
        const values = [hash, emailId];
        db.query(query, values, (error, result) => {
            if (error) {
                response.status(500).json({ error: "Server error!" });
            } else {
                response.status(200).send("password_successfully_updated");
            }
        }
        )
    });

})

module.exports = router;