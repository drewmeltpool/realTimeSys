const option = {
    bezierCurve: false,
    maintainAspectRatio: false,
    elements: {
        point: {
            radius: 1
        }
    },
    responsive: true,
    scales: {
        yAxes: [{
            stacked: true,
            gridLines: {
                display: true,
                color: "rgba(255,99,132,0.2)"
            }
        }],
        xAxes: [{
            gridLines: {
                display: false
            }
        }],
    }
};

const conf = (name, len, arr) => ({
    type: 'line',
    data: {
        labels: new Array(len)
            .fill(0)
            .map((_, i) => i),

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

const newGraphic = (color, arr) => ({
    lineTension: 0,
    label: '2.1',
    backgroundColor: window.chartColors = '#fff',
    borderColor: window.chartColors = color,
    borderWidth: 2,
    fill: false,
    data: arr,
})


const harmonicsAmount = 8
const frequency = 1100
const N = 256

const main = () => {
    const res = []
    for (let i = 0; i < harmonicsAmount; i++) {
        let W = (frequency / harmonicsAmount) * (i + 1)
        let amplitude = Math.random()
        let phase = Math.random()
        for (let j = 0; j < N; j++) {
            res[j] = (amplitude * Math.sin(W * j + phase))
        }
    }
    return res
}

const average = arr => arr.reduce((a, c) => a + c) / arr.length
const mathAverageTrick = arr => Math.sqrt(average(arr.map(num => Math.pow((num - average(arr)), 2))))

const correlation = (sig1, sig2) => {
    const a1 = average(sig1)
    const a2 = average(sig2)
    const mat1 = mathAverageTrick(sig1)
    const mat2 = mathAverageTrick(sig2)
    const ans = []
    const len = Math.floor(sig1.length / 2)

    for (let i = 0; i < len; i++) {
        let cov = 0
        for (j = 0; j < len; j++) {
            cov += (sig1[j] - a1) * (sig2[i + j] - a2) / (len - 1)
        }
        ans.push(cov / (Math.sqrt(mat1) * Math.sqrt(mat2)))
    }
    return ans
}

const autoCorrelation = sig => correlation(sig, sig)

//Usage
window.onload = function() {
    const ctx = document.querySelector('#myChart').getContext('2d')
    const ctx2 = document.querySelector('#secChart').getContext('2d')
    const ctx3 = document.querySelector('#thirdChart').getContext('2d')

    const sig1 = main()
    const sig2 = main()

    const graphic = new Chart(ctx, conf('1.0', N, sig1))

    const secConf = conf('2.0', N / 2, autoCorrelation(sig1))

    secConf.data.datasets.push(newGraphic('red', sig1))
    const graphic2 = new Chart(ctx2, secConf)


    const thirdConf = conf('3.0', N / 2, correlation(main(), main()))
    thirdConf.data.datasets.push(newGraphic('red', sig1))
    thirdConf.data.datasets.push(newGraphic('orange', sig2))
    const graphic3 = new Chart(ctx3, thirdConf)

}