const fermaPromise = n => new Promise((resolve, reject) => resolve(n))

const input = document.querySelector('#ferma-input-js')
const btn = document.querySelector('#btn--ferma-js')
const answerBox = document.querySelector('#answer-box-js')
const tableWrapper = document.querySelector('.table-wrapper')

btn.addEventListener('click', () => {
    const inputValue = input.value
    fermaPromise(inputValue)
        .then(n => ferma(n))
        .then(res => {
            const { error, result, log } = res
            if (error) {
                tableWrapper.innerHTML = ''
                answerBox.textContent = error
                return
            }
            const tbodyStr = log.map(obj => `<tr><th scope="row">${obj.iteration}</th><td>${obj.a}</td><td>${obj.b}</td></tr>`).join('')
            answerBox.textContent = result.join('*')
            tableWrapper.innerHTML =
                `
                    <table class="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">a</th>
                                <th scope="col">b</th>
                            </tr>
                        </thead>
                        <tbody id="log-js">
                            ${tbodyStr}
                        </tbody>
                    </table>
                    `
        })
        .catch(err => console.log(err))
})