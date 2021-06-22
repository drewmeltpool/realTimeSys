class Node {
	constructor(value, next) {
		this.value = value
		this.next = next
	}
}

export default class Queue {
	constructor() {
		this.begin = null
		this.last = null
		this.length = 0
	}

	push(value) {
		const node = new Node(value, null)

		if (this.begin) {
			this.last.next = node
		} else {
			this.begin = node
		}
		this.last = node

		this.length++
	}

	shift() {
		const current = this.begin
		this.begin = this.begin.next
		this.length--
		return current.value
	}
}
