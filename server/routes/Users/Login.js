const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken');
const db = require('../../database/Connection')

const verifyPassword = (result, password, response) => {
    const correctPassword = result[0].password;
    const correctEmail = result[0].emailId;
    bcrypt.compare(password, correctPassword).then(async (match) => {
      if (!match) response.status(400).json({ error: "Incorrect Password!" })
      else {
        const accessToken = sign({ username: correctEmail, id: result[0].id }, process.env.ACCESSTOKEN)
        response.status(200).json({
          accessToken: accessToken
        });
      }
    });
  }
  
  const verifyCredentials = (emailId, password, response) => {
    const query = "select * from users where emailId = ?";
    db.query(query, [emailId],
      (err, result) => {
        if(err) {
            response.status(500).json({ error: "Server error!" });
        }
        else{
          if(result.length === 0){
            response.status(400).json({ error: "Account with this email doesn't exist" });
          }
          else{
            verifyPassword(result, password, response);
          }
        }
      })
  }

router.post("/", (request, response) => {
    const emailId = request.body.email;
    const password = request.body.password;
    
    verifyCredentials(emailId, password, response);
})

module.exports = router;