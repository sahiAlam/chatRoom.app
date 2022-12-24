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
app.use('/static', express.static(path.join(__dirname + '/public')));

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + './public/index.html'));
});
