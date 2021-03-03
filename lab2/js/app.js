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

const dftComplexity = number => number * (number - 1)

const dft = arr => arr.map((_, i) =>
    arr.map((num2, j) =>
        math.multiply(num2, math.exp(
            math.multiply(
                math.complex('-2i'),
                Math.PI * i * j / arr.length)))
    ).reduce((a, c) => math.add(a, c))
)

const complexToReal = arr => arr.map(obj => Math.sqrt(Math.pow(parseFloat(obj.im), 2) + Math.pow(parseFloat(obj.re), 2)))

const option = {
    maintainAspectRatio: false,
    elements: { point: { radius: 0 } },
    scales: {
        yAxes: [{ gridLines: { color: 'rgba(0,0,0,0.2)' } }],
        xAxes: [{ gridLines: { display: false } }]
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
            borderColor: window.chartColors = '#07c',
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
    borderColor: window.chartColors = '#07c',
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

    const dftSig1 = complexToReal(dft(sig1))
    const graphic2 = new Chart(ctx2, conf('2.0', N, dftSig1))

    const complexityGFTArr = createArray(N).map((_, i) => dftComplexity(i + 1))
    const ctx3 = document.querySelector('#thirdChart').getContext('2d')
    const graphic3 = new Chart(ctx3, conf('3.0', N, complexityGFTArr))
}