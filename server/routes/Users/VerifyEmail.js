const express = require("express");
const router = express.Router();
const db = require('../../database/Connection')

const query = "select emailId from users";

router.post("/", (request, response) => {
    db.query(query, (error, result) => {
        if (error) {
            response.status(500).json({ error: "Server error!" });
        } else {
            let unique = true;
            for (let index = 0; index < result.length; index++) {
                if(request.body.email === result[index].emailId){
                    unique = false;
                }
            }
            response.status(200).json(unique);
        }
    }
    )
})

module.exports = router;