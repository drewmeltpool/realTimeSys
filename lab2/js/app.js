const harmonicsAmount = 8
const frequency = 1100
const N = 256

const createArray = len => new Array(len).fill(0)
const average = arr => arr.reduce((a, c) => a + c) / arr.length
const mathAverageTrick = arr => Math.sqrt(average(arr.map(num => Math.pow((num - average(arr)), 2))))

const createSignal = () => {
    let array = createArray(N)
    const harmArray = createArray(harmonicsAmount)
    harmArray.forEach((_, i) => array = array.map((item, j) => item + (Math.random() * Math.sin(((frequency / harmonicsAmount) * (i + 1)) * j + Math.random()))))
    return array
}
const complexity = arr => arr.length * (arr.length - 1)

const dft = arr => arr.map((_, i) =>
    arr.map((num2, j) =>
        math.multiply(num2, math.exp(math.multiply(math.complex('-2i'), Math.PI * i * j / arr.length)))
    ).reduce((a, c) => math.add(a, c))
)
const complexToReal = arr => arr.map(obj => Math.sqrt(Math.pow(parseFloat(obj.im), 2) + Math.pow(parseFloat(obj.re), 2)))

const generateRandomColor = range => () => Math.round(Math.random() * range)
const RGB = generateRandomColor(255)
const generateRandomColorRGBA = opacity => `rgba(${RGB()},${RGB()},${RGB()},${opacity})`

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
window.onload = function() {
    const ctx = document.querySelector('#myChart').getContext('2d')

    const sig1 = createSignal()
    const graphic = new Chart(ctx, conf('1.0', N, sig1))

    const ctx2 = document.querySelector('#secChart').getContext('2d')

    //Calc complexity

    const dftSig1 = complexToReal(dft(sig1))
    const graphic2 = new Chart(ctx2, conf('2.0', N, dftSig1))


    // const timeAutoCorelation = howLong('autoCorrelation', () => {
    //     const secConf = conf('2.0', N / 2, autoCorrelation(sig1))
    //     secConf.data.datasets.push(newGraphic('2.1', sig1))
    //     const graphic2 = new Chart(ctx2, secConf)
    // })


    // const ctx3 = document.querySelector('#thirdChart').getContext('2d')
    // const timeCorelation = howLong('correlation', () => {
    //     const thirdConf = conf('3.0', N / 2, correlation(sig1, sig2))
    //     thirdConf.data.datasets.push(newGraphic('3.1', sig1))
    //     thirdConf.data.datasets.push(newGraphic('3.2', sig2))
    //     const graphic3 = new Chart(ctx3, thirdConf)
    // })

    // console.log(timeAutoCorelation - timeCorelation)

}