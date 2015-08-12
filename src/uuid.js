const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
export default function uuid() {
	var id = '';
	var count = 6;
	while (count--) {
		id += chars[Math.floor(Math.random() * 100 % 61)];
	}
	return id;
}