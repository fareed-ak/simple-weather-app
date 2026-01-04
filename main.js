const inputEl = document.getElementById('input-city');
const buttonEl = document.getElementById('search-button');
const apiEl = document.getElementById('api-input');
const containerEl = document.querySelector('.bottom-container');

async function getCoordinates() {
  const city = inputEl.value.trim();
  buttonEl.disabled = true;

  const API_KEY = apiEl.value;
  const coordinatesUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

  containerEl.innerHTML = `<div class="loading-container"><p>Loading...</p></div>`;
  try {
    if (!API_KEY) {
      throw new Error('Input API KEY first');
    }

    if (!city) {
      throw new Error('Enter a city first');
    }

    const response = await fetch(coordinatesUrl);

    if (!response.ok) {
      throw new Error ('Failed to Fetch Co-ordinates');
    }

    const data = await response.json();

    if (data.length === 0) {
      throw new Error(`${city} is not a City`);
    }
    inputEl.value = '';

    const lat = data[0].lat;
    const lon = data[0].lon;

    getWeather(lat, lon, API_KEY);
  }

  catch (error) {
    containerEl.innerHTML = `<div class="error-container"><p class="error">${error.message}</p></div>`;
  }

  finally {
    buttonEl.disabled = false;
  }
}


async function getWeather(lat, lon, API_KEY) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(weatherUrl);

    if(!response.ok) {
      throw new Error('Couldn\'t fetch weather');
    }

    const data = await response.json();    
    renderUi(data);
  }

  catch (error)  {
    containerEl.innerHTML = `<div class="error-container"><p class="error">${error.message}</p></div>`;
  }
}


function renderUi(data) {

  const city = data.name;
  const windSpeed = data.wind.speed;
  const temp = data.main.temp;
  const feelsLike = data.main.feels_like;
  const humidity = data.main.humidity;
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;

  containerEl.innerHTML = `
  <div class="city-display">
    <p class="city-name">&#128205; ${city}</p>
  </div>

  <div class="weather-display">
    <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="icon" class="icon">
    <div class="temp-display">
      <span class="current-temp">
        ${temp}&deg;c
      </span>
      <span class="feels-like">
        Feels Like: ${feelsLike}&deg;c
      </span>
    </div>
  </div>

  <div class="outer-other-info">
    <div class="inner-other-info">
      <span class="info-icon">&#127788;</span>
      <div class="text-info">
        <span>wind Speed</span>
        <span>${(windSpeed*3.6).toFixed(2)} km/h</span>
      </div>
    </div>

    <div class="inner-other-info">
      <span class="info-icon">&#128167;</span>
      <div class="text-info">
        <span>Humidity</span>
        <span>${humidity}%</span>
      </div>
    </div>

    <div class="inner-other-info">
      <span class="info-icon">&#9729;</span>
      <div class="text-info">
        <span>Description</span>
        <span>${description}</span>
      </div>
    </div>
  </div>
  `;
}

function handleKeydown(event) {
  if (event.key === 'Enter') {
    getCoordinates();
  }
}

buttonEl.addEventListener('click', getCoordinates);
inputEl.addEventListener('keydown', handleKeydown);