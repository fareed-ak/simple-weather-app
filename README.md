# Weather App 🌦️
[Live Demo](https://fareed-ak.github.io/simple-weather-app/)

This is a simple weather app made using **HTML, CSS and JavaScript**.  
I built this project to learn how APIs work and how to fetch real data using JavaScript.

This app uses the **OpenWeatherMap API** to get weather information.

---

## What this app does

- Takes a **city name** from the user
- Converts the city name into **latitude and longitude**
- Uses those coordinates to get **current weather data**
- Shows:
  - City and country
  - Weather condition
  - Temperature (current, min, max)
  - Humidity
  - Wind speed
  - Weather icon

---

## How the app works (Workflow)

1. User enters:
   - API key
   - City name

2. When the search button (or Enter key) is pressed:
   - The app first calls the **Geocoding API**
   - This API converts the city name into latitude and longitude

3. After getting latitude and longitude:
   - The app calls the **Weather API**
   - Weather data is fetched using those coordinates

4. The received data is then:
   - Processed in JavaScript
   - Displayed on the screen using DOM manipulation

---

## APIs used

- OpenWeatherMap Geocoding API  
- OpenWeatherMap Current Weather API  

---

## How to use this app

1. Get a free API key from OpenWeatherMap
2. Open the app in a browser
3. Paste your API key in the API key input field
4. Enter a city name
5. Click **Search** or press **Enter**
6. Weather information will be displayed on the screen

---

## Notes

- This project is made for learning purposes
- API key is entered manually (no backend used)

---

## What I learned from this project

- How to use APIs in JavaScript
- How async and await work
- How to handle errors properly
- How to update the UI using fetched data
- How real-world APIs are chained together

---

## Future improvements

- Better UI design
- Weather based background
- Save search history
- Use backend to hide API key

---

Made as a beginner project while learning JavaScript 🚀
