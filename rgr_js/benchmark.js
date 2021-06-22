export default async function benchmark(cb) {
	const start = window.performance.now()
	await cb()
	const end = window.performance.now()
	const duration = end - start
	return duration
}
