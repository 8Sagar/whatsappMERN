
//import { Server } from 'socket.io';

// const io = new Server(9000, {
//     cors: {
//         origin: 'http://localhost:3000',
//     }, 
// })

import { io } from "socket.io-client";

const socket = io("https://whatsappmern-1.onrender.com", {
  transports: ["websocket"],
});


let users = [];

// add user if not already in array
const addUser = (userData, socketId) => {
    if (!users.some(user => user.sub === userData.sub)) {
        users.push({ ...userData, socketId });
    }
};

// remove user when disconnected
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

// get user by their sub (id)
const getUser = (userId) => {
    return users.find(user => user.sub === userId);
};

io.on('connection', (socket) => {
    console.log('user connected:');

    // connect and add user
    socket.on("addUser", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    });

    // send message
    socket.on('sendMessage', (data) => {
        const user = getUser(data.receiverId);
        if (user) {
            io.to(user.socketId).emit('getMessage', data);
        } else {
            console.log("Receiver not connected:", data.receiverId);
        }
    });

    // disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected:');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});
