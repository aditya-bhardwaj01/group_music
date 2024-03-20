const express = require("express");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const db = require('../../database/Connection')
const ACCESSTOKEN = process.env.ACCESSTOKEN

const getSecretCodes = () => {
    const query = "select groupSecretCode from groupsdata";
    return new Promise((resolve, reject) => {
        db.query(query,
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


const generateUniqueGroupCode = async (secretCodes) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    const codeLength = 8;
    let code;
    let isCodeUnique = false;

    while (!isCodeUnique) {
        code = '';
        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        const existingGroup = secretCodes.has(code);

        if (!existingGroup) {
            isCodeUnique = true;
        }
    }

    return code;
}


const insertGroup = (groupName, generatedCode, ownerId, displayName) => {
    const query = "insert into groupsdata (groupName, groupSecretCode, ownerId, displayName) values (?, ?, ?, ?)";
    const values = [groupName, generatedCode, ownerId, displayName];
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
    const groupName = request.body.groupName;
    const displayName = request.body.displayName;
    const accessToken = request.body.accessToken;

    const validToken = verify(accessToken, ACCESSTOKEN);
    const userId = validToken.id;

    let secretCodes = [];
    try {
        secretCodes = await getSecretCodes();
    } catch {
        response.status(500).json({ error: "Server error!" });
    }

    const secretCodeSet = new Set();
    for (let index = 0; index < secretCodes.length; index++) {
        const code = secretCodes[index].groupSecretCode;
        secretCodeSet.add(code);
    }
    
    const generatedCode = await generateUniqueGroupCode(secretCodeSet);
    
    try{
        await insertGroup(groupName, generatedCode, userId, displayName);
        response.status(200).json({ secretCode: generatedCode });
    } catch {
        response.status(500).json({ error: "Server error!" });
    }
})

module.exports = router;