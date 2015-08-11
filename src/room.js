var uuid = require('./uuid');

export default class Room {

	constructor() {
		this.id = uuid();
		this.players = [];
	}

	static rooms = {};
	static new() {
		var room = new Room();
		this.rooms[room.id] = room;
		console.log('new room created', room.id);
		return room;
	}
}