var uuid = require('./uuid');
var Game = require('kyu-core').Game;

export default class Room {

	constructor() {
		this.id = uuid();
		this.players = new Set();
		this.game = Game.new();
	}

	static rooms = {};
	
	// TODO rules about who can and can't join games?
	static new() {
		var room = new Room();
		this.rooms[room.id] = room;
		console.log('new room created', room.id);
		return room;
	}

	static get(roomId) {
		return this.rooms[roomId];
	}
}