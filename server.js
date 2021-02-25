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
  let Name = '';
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });

  socket.on('chatJoinOrLeave', (name) => {
    Name = name;
    socket.broadcast.emit('chatJoinOrLeave', {
      name: name,
      type: 'joined'
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('chatJoinOrLeave', {
      name: Name,
      type: 'left'
    });
  });

});


http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
