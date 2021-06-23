import funcs from './taskFunc/funcs.js'
import deepCopy from './common/deepCopy.js'
import benchmark from './benchmark/benchmark.js'
import { Fifo, Edf, Rm } from './Algo/discipline.js'
import { Sheduler } from './Sheduler/Sheduler.js'
import Rand from './common/Rand.js'
import Task from './Task/Task.js'

const LEN = 10
const FUNCS = Object.values(funcs)

const generateId = (
	(a = 0) =>
	() =>
		a++
)()
console.log(FUNCS)
const chooseRandFunc = () => FUNCS[new Rand().randInt(0, FUNCS.length - 1)]
const generatePriority = () => new Rand().randInt(0, 10)
const generateDuration = () => new Rand().randInt(30, 50)
const generateTime = () => new Rand().randInt(40, 60)

let next = 0

const createTask = () => {
	const duration = generateDuration()
	const time = generateTime()
	next += new Rand().randInt(200, 500)
	return new Task({
		startTime: Date.now() + next,
		deadline: Date.now() + next + time,
		id: generateId(),
		priority: generatePriority(),
		duration: duration < time ? time : duration,
		func: chooseRandFunc(),
		time,
	})
}

const generateTask = () => new Array(LEN).fill(0).map(() => createTask())

const shedFifo = new Sheduler(new Fifo(), generateTask().map(deepCopy), 5)
const shedEdf = new Sheduler(new Edf(), generateTask().map(deepCopy), 5)
const shedRm = new Sheduler(new Rm(), generateTask().map(deepCopy), 5)

const starter = async sheduler => {
	const tasks = []
	for await (const task of sheduler) {
		if (task.isCompleted) {
			console.log(task)
			tasks.push(task)
		}
	}
	return tasks
}

shedFifo.add({ ...createTask() })
shedEdf.add({ ...createTask() })
shedRm.add({ ...createTask() })

console.log('Fifo')
console.log(await benchmark(async () => console.log(await starter(shedFifo))))
console.log('Edf')
console.log(await benchmark(async () => console.log(await starter(shedEdf))))
console.log('Rm')
console.log(await benchmark(async () => console.log(await starter(shedRm))))
