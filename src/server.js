var config = require('./config'); 
var Room = require('./room');
var Player = require('kyu-core').Player;
var Card = require('kyu-core').Card;

var io = require('socket.io')(config.port);
console.log('listening on port:', config.port);

io.on('connection', function (socket) {
	
	console.log('user', socket.id, 'connected');
  
  socket.on('game:create', function () {
  	console.log('user', socket.id, 'sent game:create');

    var room = Room.new();
    socket.join(room.id);
    socket.emit('game:created', room.id);

    // create a new player and give a random hand\
    var p1 = Player.new();
    for (let i = 0; i < 5; i++) {
      p1.cards.push(Card.random());
    }
    room.game.add(p1, p1.cards);

    // broadcast player and hand to room
    io.to(room.id).emit('player:joined', room.game.hands.get(p1));
  });

  socket.on('game:join', function (roomId) {
    console.log('user', socket.id, 'joining game', roomId);
    socket.join(roomId)
    socket.emit('game:joined');

    var room = Room.get(roomId);
    var p2 = Player.new();
    for (let i = 0; i < 5; i++) {
      p2.cards.push(Card.random());
    }
    room.game.add(p2, p2.cards);

    // broadcast player and hand to room
    io.to(roomId).emit('player:joined', room.game.hands.get(p2));

    // start the game
    room.game.start();
    io.to(roomId).emit('game:start', room.game);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
  	console.log('user', socket.id, 'disconnected');
	});
});