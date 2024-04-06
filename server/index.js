const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Users Routers
const verifyEmail = require('./routes/Users/VerifyEmail')
app.use('/users/verifyEmail', verifyEmail);

const otpVerification = require('./routes/Users/SendOtp')
app.use('/users/verifyOtp', otpVerification);

const SignUp = require("./routes/Users/SignUp");
app.use("/users/signup", SignUp);

const login = require("./routes/Users/Login");
app.use("/users/login", login);

const resetPassword = require("./routes/Users/ResetPassword");
app.use("/users/resetPassword", resetPassword);

// GroupManagement Routers
const createGroup = require('./routes/GroupManagement/CreateGroup');
app.use('/groupManagement/create', createGroup);

const joinGroup = require('./routes/GroupManagement/JoinGroup');
app.use('/groupManagement/join', joinGroup);

// ListGroups Router
const ownerGroups = require('./routes/ListGroups/OwnerGroup');
app.use('/listGroups/owner', ownerGroups);

const singleGroupData = require('./routes/ListGroups/SingleGroup');
app.use('/listGroups/singleGroup', singleGroupData);

app.listen(3001, ()=>{
    console.log("Server listening on port 3001");
})

