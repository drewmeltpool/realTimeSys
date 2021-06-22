export default function deepCopy(obj) {
	return Object.keys(obj).reduce((acc, key) => {
		if (typeof obj[key] === 'object' && obj[key] !== null) {
			acc[key] = Array.isArray(obj[key])
				? obj[key].map(copyObject)
				: deepCopy(obj[key])
			return acc
		}
		acc[key] = obj[key]
		return acc
	}, {})
}
