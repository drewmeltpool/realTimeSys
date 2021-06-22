import deepCopy from './deepCopy.js'
import benchmark from './benchmark.js'
import { Fifo, Edf, Rm } from './discipline.js'
import { Queue, Sheduler } from './Sheduler.js'
import Rand from './Rand.js'
import Task from './Task.js'

const LEN = 10

const generateId = (
	(a = 0) =>
	() =>
		a++
)()

const generatePriority = () => new Rand().randInt(0, 10)
const generateDuration = () => new Rand().randInt(30, 50)
const generateTime = () => new Rand().randInt(40, 60)

const tasks1 = new Array(LEN).fill(0).map(() => {
	const duration = generateDuration()
	const time = generateTime()
	return new Task({
		id: generateId(),
		priority: generatePriority(),
		duration: duration < time ? time : duration,
		time,
	})
})

const shed1 = new Sheduler(
	new Queue().fill(new Fifo(tasks1.map(deepCopy)).create()),
	1000
)

const shed2 = new Sheduler(
	new Queue().fill(new Edf(tasks1.map(deepCopy)).create()),
	1000
)

const shed3 = new Sheduler(
	new Queue().fill(new Rm(tasks1.map(deepCopy)).create()),
	1000
)

const starter = async sheduler => {
	const tasks = []
	for await (const task of sheduler) {
		if (task.isDone !== undefined) {
			tasks.push(task)
		}
	}
	return tasks
}

console.log(await benchmark(async () => console.log(await starter(shed1))))

console.log(await benchmark(async () => console.log(await starter(shed2))))

console.log(await benchmark(async () => console.log(await starter(shed3))))
