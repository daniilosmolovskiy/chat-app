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

    socket.emit('message', formatMessage('admin', `Welcome, ${userName}`))
    
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

server.listen(process.env.PORT || 9999, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
// const path = require('path');
// const port = process.env.PORT || 9999;
// const publicPath = path.join(__dirname, 'public');

// app.use(express.static(publicPath));
// app.get('*', (req, res) => {
//    res.sendFile(path.join(publicPath, 'index.html'));
// });
// app.listen(port, () => {
//    console.log('Server is up!');
// });