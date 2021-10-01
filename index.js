const net = require('net');
const consumer = require('./consumer')
const producer = require('./producer')
const port = 1234

; (async () => {
	switch(process.argv[2]){
		case 'consumer':
			try {

				net.createServer( socket => {
					consumer.connect(socket)
				}).listen(port)

			}catch(err){

		  	console.log('Error:', err)

			}
			break
		case 'producer':
		  try{

		  	const socket = net.connect(port);
		  	socket.on('data', d => console.log(d.toString()))
        producer.connect(socket)

		  } catch(err){

		  	console.log('Error:', err)

		  }
			break
    default:
      console.log(`
        Usage: yarn start [ consumer | producer ]
      `)
			
  }
})();
