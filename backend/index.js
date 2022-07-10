let express = require("express");
let http = require("http");
let socketIO = require("socket.io");

let app = express();
let server = http.Server(app);
let io = socketIO(server);
let port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`started project on port : ${port}`);
});

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('new user joined!');
    });
    socket.on("message", (data) => {
        io.in(data.room).emit("new message", { user: data.user, message: data.message });
    });
})