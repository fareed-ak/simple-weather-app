const inputEl = document.getElementById('input-city');
const buttonEl = document.getElementById('search-button');
const apiEl = document.getElementById('api-input');
const containerEl = document.querySelector('.container');

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
  const country = data.sys.country;

  const windSpeed = data.wind.speed;

  const temp = data.main.temp;
  const tempMAx = data.main.temp_max;
  const tempMin = data.main.temp_min;
  const humidity = data.main.humidity;

  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;

  containerEl.innerHTML = `
  <div class="location-container">
    <p class="location">${city} ${country}</p>
  </div>

  <div class="icon-description-container">
    <div class="icon-container">
      <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="icon" class="icon">
    </div>
    
    <div class="description-container">
      <p class="description">Condition: ${description}</p>
      <p class="humidity">Humidity: ${humidity}%</p>
    </div>
  </div>

  <div class="temp-wind-container">
    <p class="temp">Current Tempreture: ${temp} &deg;C</p>
    <p class="max-temp">Maximum Tempreture${tempMAx} &deg;C</p>
    <p class="min-temp">Minimum Tempreture${tempMin} &deg;C</p>
    <p class="wind-speed">Wind Speed: ${(windSpeed*3.6).toFixed(2)} Km/h</p>
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