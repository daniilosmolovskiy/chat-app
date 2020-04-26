const express = require('express');
const formatMessage = require('./src/messages')
const { userJoin, getCurrentUser} = require('./src/users')

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const rooms = new Map();

app.get('/rooms', (req, res) => {
  res.json(rooms);
});

io.on('connection', socket => {
  socket.on('joinRoom', ({userName, roomId}) => {

    const user = userJoin(socket.id, userName, roomId)
    socket.join(user.room)
    io.emit('message', formatMessage('admin', `Welcome, ${userName}`))
    socket.broadcast.to(user.room).emit('message', formatMessage('admin', `${userName} connected`));

  })
  socket.on('chatMessage', msg => {

    const user = getCurrentUser(socket.id)

    io.to(user.room).emit('message', formatMessage(user.username, msg))
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(9999, (err) => {
  if(err) {
    throw Error(err);
  }
  console.log('server is started!')
}); 