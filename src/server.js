var config = require('./config'); 
var Room = require('./room');

var io = require('socket.io')(config.port);
console.log('listening on port:', config.port);

io.on('connection', function (socket) {
	
	console.log('user', socket.id, 'connected');
  
  socket.on('game:create', function () {
  	console.log('user', socket.id, 'sent game:create');

    var room = Room.new();
    socket.join(room.id);

    socket.emit('game:created', room.id);
  });

  socket.on('game:join', function (gameId) {
    console.log('user', socket.id, 'joining game', gameId);
    socket.join(gameId)

    socket.emit('game:joined');
    socket.broadcast.to(gameId).emit('player:joined', socket.id);
  });

  // // when the client emits 'add user', this listens and executes
  // socket.on('add user', function (username) {
  //   // we store the username in the socket session for this client
  //   socket.username = username;
  //   // add the client's username to the global list
  //   usernames[username] = username;
  //   ++numUsers;
  //   addedUser = true;
  //   socket.emit('login', {
  //     numUsers: numUsers
  //   });
  //   // echo globally (all clients) that a person has connected
  //   socket.broadcast.emit('user joined', {
  //     username: socket.username,
  //     numUsers: numUsers
  //   });
  // });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
  	console.log('user', socket.id, 'disconnected');
	});
});