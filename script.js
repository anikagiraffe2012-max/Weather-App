const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');

searchBtn.addEventListener('click', getWeather);

async function getWeather() {
    const city = cityInput.value.trim();
    if (city === '') {
        weatherResult.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    const apiKey = 'b26a880393a26c913d2914bdb68f1183';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            weatherResult.innerHTML = '<p>City not found. Try again.</p>';
            return;
        }

        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        weatherResult.innerHTML = `
            <h2>${city}</h2>
            <img src="${iconUrl}" alt="${description}">
            <p>Temperature: ${temperature}°C</p>
            <p>Conditions: ${description}</p>
        `;
    } catch (error) {
        weatherResult.innerHTML = '<p>Something went wrong. Please try again later.</p>';
        console.error(error);
    }

}
