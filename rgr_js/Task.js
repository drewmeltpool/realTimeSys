export default class Task {
	constructor({ id, priority, duration, time }) {
		this.needToFinish = duration
		this.id = id
		this.priority = priority
		this.time = time
		this.duration = duration
		this.dur = 0
		this.end = 0
		this.start = 0
		this.realTime = 0
		this.waitTime = 0
		this.iteration = 0
	}
}
