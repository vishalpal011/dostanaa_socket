// const express = require('express');

import express from "express";
import { Server } from 'socket.io';
const app = express();
const port = 4000;
const wifiIp = "192.168.0.198"
var server = app.listen(port, () => {
    console.log(`Server is running ${port}`);
});
 


const io = new Server(server, {
    cors: { origin: "*" }
});




// socket connection
io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userId) => {
        console.log("user_Data", userId);
        socket.join(+userId);
        socket.emit("connected",userId);
    });

    socket.on("join chat", (roomId) => {
        console.log("roomId",roomId);
        socket.join(roomId);
        console.log("User Joined Room: " + roomId);
    });

    
 
// message send and receive
    socket.on("new message", (newMessageRecieved) => {
        console.log("new Message recieved",newMessageRecieved);
          //new code
        const senderId = newMessageRecieved.sender_id;
        const recieverId = newMessageRecieved.receiver_id;
        const message = newMessageRecieved.message;
        const roomId = newMessageRecieved.room_id;
        const image = newMessageRecieved.image_data;

        // socket.in(+recieverId).emit("message received", newMessageRecieved);
        if(image)
        {
            const imageData = newMessageRecieved.image_data; // Assuming image_data contains the image data
            io.to(roomId).emit('receive image', { senderId, receiverId, image_data: imageData });
        }
        else
        {
            socket.in(+receiverId).emit("message received", newMessageRecieved);
        }
    });


    // socket disconnect
    socket.on("disconnect", (userId) => {
        console.log("USER DISCONNECTED");
        socket.leave(userId);
    });
});
