const assert = require('assert')

describe('producer.source',() => {
	const producer = require('./producer')
	it('should be readable', () => {
		assert(typeof producer.source.read === 'function')
	})
	it('should return return expressions when read', () => {
		let output = producer.source.read().toString()
		let expressionSignature = /\d [+\-*/] \d =/
		assert(output.match(expressionSignature))
	})
})

describe('producer.connect(socket)',() => {
	const producer = require('./producer')
	it('should pipe the expression source to the socket', () => {
		let socket = {}
		producer.source = {
			pipe(x){this.piped = true}
		}
		producer.connect(socket)
		assert(producer.source.piped)

	})
})
