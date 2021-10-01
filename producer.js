const net = require('net');
const {randomInt} = require('crypto');
const {Readable} = require('stream');

const port = 1234

const producer = {
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

; (async () => {
	try{
		const socket = net.connect(port);
		socket.on('data', d => console.log(d.toString()))
		producer.connect(socket)

	}catch(err){
		console.log('Error in Catch:', err)
	}
})();
