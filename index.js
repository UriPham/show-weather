const city = document.querySelector('.city')
const country = document.querySelector('.country')
const time = document.querySelector('.time')
const temperature = document.querySelector('.temperature .tempe')
const shortDesc = document.querySelector('.short-desc')
const visibility = document.querySelector('.visibility p')
const wind = document.querySelector('.wind p')
const humidity = document.querySelector('.humidity p')
const content = document.querySelector('.content')
const search = document.querySelector('.search')
const body = document.querySelector('body')

async function upLoadWeather(localSearch) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${localSearch}&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`
    let data = await fetch(apiURL).then(res => res.json())
    // console.log(data);

    if (data.cod == 200) {
        content.classList.remove('hide')
        city.innerText = data.name
        country.innerText = data.sys.country
        time.innerText = new Date().toLocaleString('vi')
        let tempe = Math.round(data.main.temp)
        temperature.textContent = tempe 
        shortDesc.innerText = data.weather[0].main ? data.weather[0].main : ''
        visibility.innerText = data.visibility + '(m)'
        wind.innerText = data.wind.speed + '(m/s)'
        humidity.innerText = data.main.humidity + '(%)'

        if (tempe < 10) {
            body.setAttribute('class', 'cold')
        } else if (tempe < 17) {
            body.setAttribute('class', 'warn')
        } else if (tempe <= 24) {
            body.setAttribute('class', 'cool')
        } else {
            body.setAttribute('class', 'hot')
        }
    }
    else {
        content.classList.add('hide')
    }
}

search.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        let localSearch = search.value.trim()
        upLoadWeather(localSearch)
        search.value = ''
    }
})

upLoadWeather('moscow')