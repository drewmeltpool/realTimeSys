import benchmark from '../benchmark/benchmark.js'

export class Queue {
	constructor() {
		this.queue = Object.create(null)
		this.length = 0
	}

	[Symbol.iterator]() {
		const { queue } = this
		let currIndex = 0
		let endIndex = this.length - 1
		return {
			next() {
				return {
					value: queue[currIndex],
					done: currIndex++ > endIndex,
				}
			},
		}
	}

	clear() {
		this.queue = Object.create(null)
		this.length = 0
	}

	fill(arr) {
		arr.forEach(item => this.push(item))
		return this
	}

	push(value) {
		this.queue[this.length] = value
		this.length++
	}

	shift() {
		const values = Object.values(this.queue)
		const node = values.shift()
		this.clear()
		this.fill(values)
		return node
	}
}

export class Sheduler {
	constructor(strategy, colection, duration) {
		this.doneCollection = []
		this.stategy = strategy
		this.duration = duration * 10000
		this.colection = new Queue().fill(strategy.create([...colection]))
	}

	refresh() {
		const { stategy } = this
		this.colection = new Queue().fill(stategy.create([...this.colection]))
		return this.colection
	}

	add(task) {
		this.colection.push(task)
		this.refresh()
	}

	[Symbol.asyncIterator]() {
		let { colection, duration, doneCollection } = this
		const refreshCollections = () => this.refresh()
		return {
			async next() {
				colection = refreshCollections()
				const task = colection.shift()
				if (task) {
					if (Date.now() >= task.startTime) {
						const workTime = task.duration < duration ? task.duration : duration

						const realTime = await benchmark(async () => {
							if (!this.start) {
								task.start = window.performance.now()
							}

							await new Promise(resolve => setTimeout(resolve, workTime))

							task.duration -= workTime
							task.dur += workTime

							if (task.duration > 0 || Date.now() < task.deadline) {
								colection.push(task)
								refreshCollections()
							}

							task.iteration++
						})

						task.realTime += realTime

						if (task.duration <= 0 || Date.now() >= task.deadline) {
							task.isCompleted = true
							task.duration = task.dur - task.time
							task.end = window.performance.now()
							task.isDone = task.needToFinish <= task.time
							if (typeof task.func !== 'function') console.log(task.func)
							task.func = task.isDone ? task.func : task.func
							doneCollection.push(task)
						}
					} else {
						colection.push(task)
					}
				} else {
					doneCollection.forEach(
						task => (task.waitTime = window.performance.now() - task.end)
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
