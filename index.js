// Server file
const { Socket } = require("dgram");
const { response } = require("express");

// create Express App
const express = require("express");
const { request } = require("http");
const path = require("path");
const app = express();

// Create Server and Port
const http = require("http").createServer(app);

const PORT = process.env.PORT || 8000;

http.listen(PORT, () => {
  console.log(`Listning on port ${PORT}`);
});

// Accessable folder and file path
app.use('/', express.static(path.join(__dirname + '/public')));

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + '/index.html'));
});

const users = {};

// Socket connection
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  // Message receiveed to server
  socket.on("message", (msg) => {
    // Message broadcast to all the users exccept You
    socket.broadcast.emit("message", msg);
  });
});