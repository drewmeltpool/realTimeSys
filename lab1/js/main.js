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

const option = {
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

const config = {
    type: 'line',
    data: {
        labels: new Array(N)
            .fill(0)
            .map((_, i) => i),

        datasets: [{
            label: 'random',
            backgroundColor: window.chartColors = '#fff',
            borderColor: window.chartColors = '#07c',
            borderWidth: 2,
            fill: false,
            data: main(),
        }]
    },
    options: option,
}

window.onload = function() {
    const ctx = document.querySelector('#myChart').getContext('2d')
    const graphic = new Chart(ctx, config)
};