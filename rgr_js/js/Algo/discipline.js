class Algo {
	constructor() {
		this.arr = null
	}

	create(arr) {
		return arr
	}
}

export class Fifo extends Algo {
	constructor() {
		super()
	}
}

export class Edf extends Algo {
	constructor() {
		super()
	}

	create(arr) {
		this.arr = arr.sort((a, b) => a.priority - b.priority)
		return this.arr
	}
}

export class Rm extends Algo {
	constructor() {
		super()
	}

	create(arr) {
		this.arr = arr.sort((a, b) => a.needToFinish - b.needToFinish)
		return this.arr
	}
}
