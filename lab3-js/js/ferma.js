const ferma = n => {
	if (isNaN(n)) return { error: 'not a number' }
	if (n < 0) return { error: 'must be > 0' }
	if (!(n & 1)) return { error: 'is not odd' }
	let x = parseInt(Math.sqrt(n))
	let y = 0
	while (true) {
		let r = x * x - n
		console.log(r)
		y = parseInt(Math.sqrt(r))
		console.log(y)
		if (y * y === r) {
			return { result: [x - y, x + y] }
		}
		x++
	}
}

console.log(ferma(13))
