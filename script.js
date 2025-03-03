const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const weatherResult = document.getElementById('weatherResult');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const locationInput = document.getElementById('locationInput');

getWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value || 'auto:ip'; // Default to user's location if input is empty
    fetchWeatherData(location);
});

function fetchWeatherData(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherResult.innerHTML = `<p>${error.message}</p>`;
        });
}

function displayWeather(data) {
    const { location, current } = data;
    weatherResult.innerHTML = `
        <h2>Weather in ${location.name}, ${location.country}</h2>
        <p>Temperature: ${current.temp_c} °C</p>
        <p>Condition: ${current.condition.text}</p>
        <p>Humidity: ${current.humidity}%</p>
        <p>Wind: ${current.wind_kph} kph</p>
    `;
}