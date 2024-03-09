const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require('../../database/Connection')

const query = "insert into users (name, emailId, password) values (?, ?, ?)";

router.post("/", (request, response) => {
    const name = request.body.name;
    const emailId = request.body.email;
    const password = request.body.password;

    bcrypt.hash(password, 10).then((hash) => {
        const values = [name, emailId, hash];
        db.query(query, values, (error, result) => {
            if (error) {
                response.status(500).json({ error: "Server error!" });
            } else {
                response.status(200).send("account_successfully_created");
            }
        }
        )
    });

})

module.exports = router;