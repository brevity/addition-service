const {Transform} = require('stream')

const consumer = {
	memo: '',
	evaluate: new Transform({
		transform(expression, _, done){
			let str = expression.toString()

			str = consumer.memo + str

			const expressions = str.split("\n")

			expressions.map((exp,i)=>{

				if(exp.length < 8 && i + 1 === expressions.length){
					consumer.memo = exp
				}

				const [
					x,
					opsign,
					y,
				] = exp.split(" ")

				const operations = {
					['+']: (x, y) => x + y,
					['-']: (x, y) => x - y,
					['*']: (x, y) => x * y,
					['/']: (x, y) => x / y
				}

				const operate = (x, sign, y) => {
					let operation = operations[sign]

					if (operation === undefined){
						return false
					}
					return operation(
						parseInt(x),
						parseInt(y)
					)
				}

				const result = operate(x, opsign, y)

				if(result !== false){
					this.push(`${x} ${opsign} ${y} = ${result}\n`)
				}

			})

			done()
		}
	}),
	connect(socket){

		socket.on('data', d => {
			console.log(d.toString())
		})
		//this.evaluate.on('data', d=>console.log('--> :',d.toString()))

		socket.pipe(this.evaluate)
		this.evaluate.pipe(socket)
	}
}
module.exports = consumer
