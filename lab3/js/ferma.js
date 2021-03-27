const ferma = n => {
    if (n < 0) return { error: 'must be > 0' }
    if (!(n & 1)) return { error: 'is not odd' }
    let x = parseInt(Math.sqrt(n))
    let y = 0
    let iteration = 0
    const log = []
    while (true) {
        let r = Math.abs(x ** 2 - n)
        let a = (x - Math.sqrt(r)).toFixed(3)
        let b = (x + Math.sqrt(r)).toFixed(3)
        log.push({ iteration, a, b })
        iteration++
        y = parseInt(Math.sqrt(r))
        if (y ** 2 === r) {
            return { result: [x - y, x + y], log }
        }
        x++
    }
}