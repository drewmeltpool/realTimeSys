const harmonicsAmount = 8
const frequency = 1100
const N = 256

const createArray = len => new Array(len).fill(0)
const average = arr => arr.reduce((a, c) => a + c) / arr.length
const mathAverageTrick = arr => Math.sqrt(average(arr.map(num => Math.pow((num - average(arr)), 2))))

const main = () => {
    let array = createArray(N)
    const harmArray = createArray(harmonicsAmount)
    harmArray.forEach((_, i) => array = array.map((item, j) => item + (Math.random() * Math.sin(((frequency / harmonicsAmount) * (i + 1)) * j + Math.random()))))
    return array
}

const correlation = (sig1, sig2) => {
    const a1 = average(sig1)
    const a2 = average(sig2)
    const mat1 = mathAverageTrick(sig1)
    const mat2 = mathAverageTrick(sig2)
    const len = parseInt(sig1.length / 2)
    const array = createArray(len)
    return array.map((_, i) => (array.reduce((a, _, j) => a + (sig1[j] - a1) * (sig2[i + j] - a2) / (len - 1))) / (Math.sqrt(mat1) * Math.sqrt(mat2)))
}

const autoCorrelation = sig => correlation(sig, sig)

const generateRandomColor = range => () => Math.round(Math.random() * range)
const RGB = generateRandomColor(255)
const generateRandomColorRGBA = opacity => `rgba(${RGB()},${RGB()},${RGB()},${opacity})`

const howLong = (label, cb) => {
    const start = window.performance.now()
    cb()
    const end = window.performance.now()
    const duration = end - start
    console.log(`${label}: ${duration} ms`)
    return duration;
}

const option = {
    maintainAspectRatio: false,
    elements: {
        point: {
            radius: 0
        }
    },
    scales: {
        yAxes: [{
            stacked: true,
            gridLines: {
                display: true,
                color: generateRandomColorRGBA(0.2)
            }
        }],
        xAxes: [{
            gridLines: {
                display: false
            }
        }]
    }
}


const conf = (name, len, arr) => ({
    type: 'line',
    data: {
        labels: createArray(len).map((_, i) => i),
        datasets: [{
            lineTension: 0,
            label: name,
            backgroundColor: window.chartColors = '#fff',
            borderColor: window.chartColors = generateRandomColorRGBA(1),
            borderWidth: 2,
            fill: false,
            data: arr,
        }]
    },
    options: option,
})

const newGraphic = (name, arr) => ({
    lineTension: 0,
    label: name,
    backgroundColor: window.chartColors = '#fff',
    borderColor: window.chartColors = generateRandomColorRGBA(1),
    borderWidth: 2,
    fill: false,
    data: arr,
})

//Usage
// window.onload = function() {
//     const ctx = document.querySelector('#myChart').getContext('2d')
//     const ctx2 = document.querySelector('#secChart').getContext('2d')
//     const ctx3 = document.querySelector('#thirdChart').getContext('2d')

//     const sig1 = main()
//     const sig2 = main()

//     const graphic = new Chart(ctx, conf('1.0', N, sig1))
//     console.log('Середнє значення', average(sig1))
//     console.log('Дисперсія', mathAverageTrick(sig1))

//     console.log('Середнє значення', average([5, 0, 3, 8, 3]))
//     console.log('Дисперсія', mathAverageTrick([5, 0, 3, 8, 3]))

//     const timeAutoCorelation = howLong('autoCorrelation', () => {
//         const secConf = conf('2.0', N / 2, autoCorrelation(sig1))
//         secConf.data.datasets.push(newGraphic('2.1', sig1))
//         const graphic2 = new Chart(ctx2, secConf)
//     })

//     const timeCorelation = howLong('correlation', () => {
//         const thirdConf = conf('3.0', N / 2, correlation(sig1, sig2))
//         thirdConf.data.datasets.push(newGraphic('3.1', sig1))
//         thirdConf.data.datasets.push(newGraphic('3.2', sig2))
//         const graphic3 = new Chart(ctx3, thirdConf)
//     })

//     console.log(timeAutoCorelation - timeCorelation)

// }

let tau = 2
const correlation1 = (sig1, sig2) => {
    const a1 = average(sig1)
    const a2 = average(sig2)
    const mat1 = mathAverageTrick(sig1)
    const mat2 = mathAverageTrick(sig2)
    const len = parseInt(sig1.length / 2)
    const array = createArray(len)
    return array.map((_, i) => (array.reduce((a, _, j) => a + (sig1[j] - a1) * (sig2[i + tau] - a2) / (len - 1))) / (Math.sqrt(mat1) * Math.sqrt(mat2)))
}
console.log('Rxx', correlation1([0, 1, 2], [5, 0, 3, 8, 3]));