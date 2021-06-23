export default async function benchmark(cb) {
	const start = window.performance.now()
	await cb()
	return window.performance.now() - start
}
