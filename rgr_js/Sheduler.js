import benchmark from './benchmark.js'

class Node {
	constructor(value) {
		this.value = value
		this.next = null
	}
}

export class Queue {
	constructor() {
		this.queue = null
		this.length = 0
	}

	fill(arr) {
		arr.forEach(item => this.push(item))
		return this
	}

	push(value) {
		const node = new Node(value)

		if (!this.length) {
			this.queue = node
		} else {
			let n = this.queue
			while (n.next) {
				n = n.next
			}
			n.next = node
		}
		this.length++
	}

	shift() {
		if (this.length) {
			const { value } = this.queue
			this.queue = this.queue.next
			this.length--
			return value
		}
		return null
	}
}

export class Sheduler {
	constructor(colection, duration) {
		this.doneCollection = []
		this.duration = duration
		this.colection = colection
	}

	[Symbol.asyncIterator]() {
		const start = window.performance.now()
		const { colection, duration, doneCollection } = this
		return {
			async next() {
				const task = colection.shift()
				if (task) {
					const workTime = task.duration < duration ? task.duration : duration

					const realTime = await benchmark(async () => {
						if (!this.start) {
							task.start = window.performance.now()
						}

						await new Promise(resolve => setTimeout(resolve, workTime))

						task.duration -= workTime
						task.dur += workTime

						if (task.duration > 0) {
							colection.push(task)
						}

						task.iteration++
					})

					task.realTime += realTime

					if (task.duration <= 0) {
						task.realTime += start
						task.duration = task.dur - task.time
						task.end = window.performance.now()
						task.isDone = task.needToFinish <= task.time
						doneCollection.push(task)
					}
				} else {
					doneCollection.forEach(
						task =>
							(task.waitTime =
								window.performance.now() - task.start + task.realTime)
					)
				}
				return {
					value: task,
					done: task == null,
				}
			},
		}
	}
}
