const {randomInt} = require('crypto');
const {Readable} = require('stream');


module.exports = {
	source: new Readable({
		read(size) {
			const [x, y] = [randomInt(1, 10), randomInt(1, 10)];
			const op = ['+', '-', '*', '/'][randomInt(100) % 4];
			this.push(`${x} ${op} ${y} = \n`);
		},
	}),
	connect(socket) {

		this.source
			.pipe(socket)

	},
}

