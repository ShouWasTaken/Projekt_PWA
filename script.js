const input = document.querySelector('#city');
const button = document.querySelector('#weatherButton');
const errorMessage = document.querySelector('.error');
const date = document.querySelector('.date');
const cityName = document.querySelector('.city_name');
const img = document.querySelector('img');
const temperature = document.querySelector('.temperature');
const temperatureDescription = document.querySelector('.temperature_description');
const feelsLike = document.querySelector('.feels_like');
const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind_speed');
const clouds = document.querySelector('.clouds');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=849361ccd38ac268f0c96aa68c6686ce';
const apiUnits = '&units=metric';
const apiLang = '&lang=pl';

function getWeather() {
  const apiCity = input.value;
  const URL = apiLink + apiCity + apiKey + apiUnits + apiLang;

  axios.get(URL)
    .then(response => {
      console.log(response.data);
      cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
      img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
      temperature.textContent = `${Math.round(response.data.main.temp)} °C`;
      temperatureDescription.textContent = `${response.data.weather[0].description}`;
      feelsLike.textContent = `Odczuwalna temperatura: ${Math.round(response.data.main.feels_like)} °C`;
      pressure.textContent = `Ciśnienie: ${response.data.main.pressure} hPa`;
      humidity.textContent = `Wilgotność: ${response.data.main.humidity} %`;
      windSpeed.textContent = `Prędkość wiatru: ${Math.round((response.data.wind.speed) * 3.6)} km/h`;
      clouds.textContent = `Zachmurzenie: ${response.data.clouds.all} %`;
      errorMessage.textContent = '';
    })
    .catch(error => {
      console.log("error", error);
      if (error.response && error.response.data && error.response.data.cod !== '200') {
        errorMessage.textContent = `${error.response.data.message}`;
      }
      [clouds, windSpeed, humidity, pressure, cityName, temperature, temperatureDescription, feelsLike].forEach(el => {
        el.textContent = '';
      });
      img.src = '';
    })
    .finally(() => {
      input.value = '';
    });
}

function getWeatherByEnter(e) {
  if (e.key === 'Enter') {
    getWeather();
  }
}

input.addEventListener('keypress', getWeatherByEnter);
button.addEventListener('click', getWeather);
