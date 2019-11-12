async function cityTime(e) {
    e.preventDefault()
    let weather = await fetch(`https://api.weatherbit.io/v2.0/current?city=${document.getElementById('city').value.toLowerCase().replace(' ', '')}&key=2f0e54c931ee427ba5e8632bcd308d25`)
    try {
        weather = await weather.json()
        document.querySelector('.now-playing').innerHTML = '<div class="music"></div>'
        document.querySelector('.weather-submit').innerHTML = `<label>${weather.data[0].city_name}</label>`
        document.querySelector('.now-playing').insertAdjacentHTML('afterbegin', 'Now Playing...')
        document.querySelector('.display-weather').insertAdjacentHTML('afterbegin', `<div class="condition">Condition<hr><div class="condition-desc">${weather.data[0].weather.description}</div></div><div class="temperature">Temperature<hr><div class="temperature-desc">${weather.data[0].temp + ' &deg;C' + (weather.data[0].temp != weather.data[0].app_temp ? ' | Feels like ' + weather.data[0].app_temp + ' &deg;C' : '')}</div></div><div class="humidity">Humidity<hr><div class="humidity-desc">${weather.data[0].rh + '&percnt;'}</div></div><div class="wind">Wind<hr><div class="wind-desc">${(Math.round(weather.data[0].wind_spd * 2.237 * 100)/100) + ' mph'}</div></div>`)
        
        
        let response = await fetch('/messages', {
            method: 'POST',
            body: JSON.stringify(weather.data[0].weather),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response = await response.json()
        document.querySelector('.now-playing').insertAdjacentHTML('beforeend', `<div class="music-link"><input class="buttonblack" type="submit" value="Click to view on Spotify!" onclick="location.href = '${response.external_urls.spotify}'"></input></div>`)
    
        document.querySelector('.music').insertAdjacentHTML('beforebegin', `<iframe src="https://open.spotify.com/embed/track/${response.id}" width="333rem" height="333rem" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`)
    
    }
    catch(error) {
        document.querySelector('.now-playing').innerHTML = `Invalid city name. Did you type it correctly?`
    }
}

export { cityTime }