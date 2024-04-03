// const express = require('express');

import express from "express";
import { Server } from 'socket.io';
const app = express();
const port = 4000;
const wifiIp = "192.168.0.198"
var server = app.listen(port, () => {
    console.log(`Server is running ${port}`);
});



app.get("/", (req, resp) => {
    resp.status(200).json("socket is running");
})

// app.get("/api/data-fetch", async (req, resp) => {

//     let queryForFetch = "test";
//     let response = await query(queryForFetch);
//     console.log("response", response);
//     resp.status(200).json(response);
// })


const io = new Server(server, {
    cors: { origin: "*" }
});

// io.on('connection', (socket) => {
//     console.log("user is comming");
//     socket.emit("userConnected","Connected Successfully");
//     // socket.on("userSocketConnect",)
//     // socket.emit('Aqib','your are connected');
//     // socket.on("connect user", (userId) => {
//     //     console.log("userId", userId);
//     //     socket.join(userId);
//     //     socket.emit("successfull joined socket", userId)
//     // })

//     // socket.on("chat room", (roomId) => {
//     //     console.log("my room Id", roomId);
//     //     socket.join(roomId);
//     // })
//     // socket.emit("room connected", "Connection Successfully");




//     //update code for
//     socket.on("tracking", async (btnKaMsg) => {
//         const room = btnKaMsg.room;
//         const longitude = btnKaMsg.location.longitude;
//         const latitude = btnKaMsg.location.latitude;

//         try {
//             const updateQuery = "UPDATE vendorlocations SET latitude = ?, longitude = ? WHERE vendor_id = ?";
//             const result = await query(updateQuery, [latitude, longitude, room]);
//             console.log("result update successfully");
//         } catch(e) {
//             console.log("error", e);
//         }

//         socket.join(room);
//         socket.emit("room connected", "Ho gaya room connection");
//         console.log("location", btnKaMsg);
//         socket.to(room).emit("message received", btnKaMsg);
//         io.to(room).emit("track location", btnKaMsg);
//     });

//     socket.on('disconnect', (socket) => {
//         console.log('Disconnect');
//     });
// });





// io.on('connection', (socket) => {
//     console.log('User connected');

//     // Receive message
//     socket.on('message', (message) => {
//         console.log('Received message:', message);
        
//         // Broadcast message to all connected clients
//         io.emit('message', message);
//     });

//     // Handle disconnect
//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });









io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userId) => {
        console.log("user_Data", userId);
        socket.join(userId);
        socket.emit("connected",userId);
    });

    socket.on("join chat", (roomId) => {
        console.log("roomId",roomId);
        socket.join(roomId);
        console.log("User Joined Room: " + roomId);
    });

    
    // socket.on("typing", (roomId) => socket.in(roomId).emit("typing"));
    // socket.on("stop typing", (roomId) => socket.in(roomId).emit("stop typing"));

    // socket.on("new message", (newMessageRecieved) => {
    //     var chat = newMessageRecieved.chat;

    //     if (!chat.users) return console.log("chat.users not defined");

    //     chat.users.forEach((user) => {
    //         if (user._id == newMessageRecieved.sender._id) return;

    //         socket.in(user._id).emit("message recieved", newMessageRecieved);
    //     });
    // });

    socket.on("new message", (newMessageRecieved) => {
        console.log("new Message recieved",newMessageRecieved);
        // const message = newMessageRecieved.message;
        const allUsersId = newMessageRecieved.users_id;
        const senderId = newMessageRecieved.sender_id;
        allUsersId.forEach((userId) => {
            if (senderId == userId) return;
            socket.in(userId).emit("message received", newMessageRecieved);
            console.log("hii");
        });




          //new code
        // const senderId = newMessageRecieved.senderId;
        // const recieverId = newMessageRecieved.recieverId;
        // const message = newMessageRecieved.message;
        // const roomId = newMessageRecieved.roomId;
        // socket.in(recieverId).emit("message received", newMessageRecieved);

    });

    socket.on("disconnect", (userId) => {
        console.log("USER DISCONNECTED");
        socket.leave(userId);
    });
});