document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

function getWeather(city) {
    const apiKey = '789a9c37bca98cde9cfaf5dedb7a7e09';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const date = new Date();
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);
                const roundedTemp = Math.round(data.main.temp);

                document.getElementById('weather-info').innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p class="date">${formattedDate}</p>
                    <p class="temperature">${roundedTemp}<span class="degree-symbol">&deg;C</span></p>
                    <p class="weather">${data.weather[0].description}</p>
                `;
            } else {
                document.getElementById('weather-info').innerHTML = `<p>City not found</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-info').innerHTML = `<p>Failed to retrieve data</p>`;
        });
}