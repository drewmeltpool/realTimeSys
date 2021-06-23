import Rand from '../common/Rand.js'

const harmonicsAmount = 8
const frequency = 1100
const N = 256

const createArray = len => new Array(len).fill(0)
const average = arr => arr.reduce((a, c) => a + c) / arr.length
const mathAverageTrick = arr =>
	Math.sqrt(average(arr.map(num => Math.pow(num - average(arr), 2))))

const main = () => {
	let array = createArray(N)
	const harmArray = createArray(harmonicsAmount)
	harmArray.forEach(
		(_, i) =>
			(array = array.map(
				(item, j) =>
					item +
					Math.random() *
						Math.sin(
							(frequency / harmonicsAmount) * (i + 1) * j + Math.random()
						)
			))
	)
	return array
}

const correlation = (sig1, sig2) => {
	const a1 = average(sig1)
	const a2 = average(sig2)
	const mat1 = mathAverageTrick(sig1)
	const mat2 = mathAverageTrick(sig2)
	const len = parseInt(sig1.length / 2)
	const array = createArray(len)
	return array.map(
		(_, i) =>
			array.reduce(
				(a, _, j) => a + ((sig1[j] - a1) * (sig2[i + j] - a2)) / (len - 1)
			) /
			(Math.sqrt(mat1) * Math.sqrt(mat2))
	)
}

const fft = arr => {
	const N = arr.length

	if (N <= 1) return arr

	const evens = fft(arr.filter((_, i) => !(i & 1)))
	const odds = fft(arr.filter((_, i) => i & 1))

	const form = index =>
		math.multiply(
			odds[index],
			math.exp(math.multiply(math.complex('-2i'), Math.PI * (index / N)))
		)

	const arr1 = createArray(N / 2).map((_, i) => math.add(evens[i], form(i)))
	const arr2 = createArray(N / 2).map((_, i) =>
		math.subtract(evens[i], form(i))
	)

	return [...arr1, ...arr2]
}

const ferma = n => {
	if (isNaN(n)) return { error: 'not a number' }
	if (n < 0) return { error: 'must be > 0' }
	if (!(n & 1)) return { error: 'is not odd' }
	let x = parseInt(Math.sqrt(n))
	let y = 0
	while (true) {
		let r = x * x - n
		y = parseInt(Math.sqrt(r))
		if (y * y === r) {
			return { result: [x - y, x + y] }
		}
		x++
	}
}

const autoCorrelation = sig => correlation(sig, sig)

export default {
	mathAverageTrick: () => mathAverageTrick(main()),
	autoCorrelation: () => autoCorrelation(main()),
	average: () => average(main()),
	ferma: () => ferma(new Rand().randInt(0, 1000)),
}
