class Algo {
	constructor(arr) {
		this.arr = arr
	}

	create() {
		return this.arr
	}
}

export class Fifo extends Algo {
	constructor(arr) {
		super(arr)
	}
}

export class Edf extends Algo {
	constructor(arr) {
		super(arr)
	}

	create() {
		return this.arr.sort((a, b) => a.priority - b.priority)
	}
}

export class Rm extends Algo {
	constructor(arr) {
		super(arr)
	}

	create() {
		return this.arr.sort((a, b) => a.needToFinish - b.needToFinish)
	}
}
