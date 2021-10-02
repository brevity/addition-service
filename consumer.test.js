const assert = require('assert')

describe('consumer evaluate',() => {
	const consumer = require('./consumer')
	it('', () => {
		assert(consumer.memo !== undefined)
	})
})

describe('consumer.connect(socket)',() => {
	const consumer = require('./consumer')
	process.stdout.name = 'stdout'
	let socket = {
		name: 'mock socket',
		pipes:[],
		pipe(x){
			this.pipes.push(x)
			this.piped = true
		}
	}
	consumer.evaluate = {
		name: 'mock evaluate transform',
		pipes:[],
		pipe(x){
			this.pipes.push(x)
			this.piped = true
		}
	}
	consumer.connect(socket)
	it('should pipe the socket to stdout', () => {
		let socketPipesTo = socket.pipes[1].name
		assert.equal(socketPipesTo, 'mock evaluate transform')
	})
	it('should pipe the socket to the evaluation stream', () => {
		let socketPipesTo = socket.pipes[0].name
		assert.equal(socketPipesTo, 'stdout')
	})
	it('should pipe the evaluation stream back to the socket', () => {
		let evaluateTransformPipesTo = consumer.evaluate.pipes[0].name
		assert.equal(evaluateTransformPipesTo, 'mock socket')
	})
})

describe.skip('consumer.transform',() => {
	const consumer = require('./consumer')
	it('should', () => {
		//let r = consumer.evaluate.write()
		console.log(consumer.transform('1 + 1 = '))

	})
})
