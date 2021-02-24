const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {

  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });

  socket.on('joined', (name) => {
    socket.broadcast.emit('joined', name);
  });

  socket.on('disconnect', () => {
    // socket.broadcast.emit('left');
    console.log('left');
  })

});



http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
