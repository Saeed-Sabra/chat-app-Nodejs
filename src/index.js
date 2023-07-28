const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New WebSocket Connection");

  socket.emit("message", "Welcome!!!");
  socket.broadcast.emit("message", "A new user has joined");

  socket.on("msg", (msg, callback) => {
    const filter = new Filter();

    if (filter.isProfane(msg)) {
      return callback("Profanity is not allowed!");
    }

    io.emit("message", msg);
    callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left!");
  });

  socket.on("location", (coords, callback) => {
    io.emit(
      "message",
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
    callback();
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
