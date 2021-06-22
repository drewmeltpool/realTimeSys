export default class Rand {
	rand(min, max) {
		return min - 0.5 + Math.random() * (max - min + 1)
	}

	randInt(min, max) {
		return ~~this.rand(min, max)
	}
}
