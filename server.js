var port = 8088;
var io = require('socket.io')(port);
console.log('listening on port:', port);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
});