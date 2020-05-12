const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 9999;
const formatMessage = require('./src/messages')
const { userJoin, getCurrentUser} = require('./src/users')

const app = express();
app.use(favicon(__dirname + '/build/favicon.png')); 

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

const server = require('http').Server(app);
const io = require('socket.io')(server);

const rooms = new Map();

app.get('/rooms', (req, res) => {
  res.json(rooms);
});

io.on('connect', socket => {
  socket.on('joinRoom', ({userName, roomId}) => {

    const user = userJoin(socket.id, userName, roomId)
    socket.join(user.room)


    socket.emit('message', formatMessage('admin', `Welcome, ${userName}.`))
    
    socket.broadcast.to(user.room).emit('message', formatMessage('admin', `${userName} connected`));

  })
  socket.on('chatMessage', msg => {

    const user = getCurrentUser(socket.id)

    io.to(user.room).emit('message', formatMessage(user.username, msg))
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    socket.removeAllListeners();
  })
})


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

server.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});