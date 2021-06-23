export default class Task {
	constructor({ id, priority, duration, time, func, startTime, deadline }) {
		this.needToFinish = duration
		this.startTime = startTime
		this.deadline = deadline
		this.priority = priority
		this.duration = duration
		this.isCompleted = false
		this.func = func
		this.iteration = 0
		this.id = id
		this.time = time
		this.dur = 0
		this.end = 0
		this.start = 0
		this.realTime = 0
		this.waitTime = 0
	}
}
