const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use((req, res, next) => {
    // Set CORS headers for the Express app
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
        transports: ['websocket', 'polling'],
    }
});


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

const memberGroups = require('./routes/ListGroups/MemberGroups');
app.use('/listGroups/member', memberGroups);

const singleGroupData = require('./routes/ListGroups/SingleGroup');
app.use('/listGroups/singleGroup', singleGroupData);

// GroupMusic Router
const isAuthenticUser = require('./routes/GroupMusic/Authorized');
app.use('/groupMusic/isAuthentic', isAuthenticUser);

const getMembers = require('./routes/GroupMusic/GetMembers');
app.use('/groupMusic/getMembers', getMembers);

// Chat routers
const getChatMessages = require('./routes/ChatMessages/GetGroupChats');
app.use('/chat/getMessages', getChatMessages);

// WebSocket setup
const socketHandlers = require('./sockets');
socketHandlers(io);

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});