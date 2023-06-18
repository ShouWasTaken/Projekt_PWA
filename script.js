const registrationButton = document.getElementById('registration-button');
const logoutButton = document.getElementById('logout-button');
const modalRegistration = document.getElementById('registerModal');
const closeRegistration = document.querySelector('.modal-content .close');
const welcomeMessage = document.getElementById('welcome-message');

registrationButton.addEventListener('click', openRegistrationModal);
closeRegistration.addEventListener('click', closeRegistrationModal);
window.addEventListener('click', outsideClickRegistration);
logoutButton.addEventListener('click', logout);

function openRegistrationModal() {
  modalRegistration.style.display = 'block';
}

function closeRegistrationModal() {
  modalRegistration.style.display = 'none';
}

function outsideClickRegistration(e) {
  if (e.target === modalRegistration) {
    modalRegistration.style.display = 'none';
  }
}

function displayWelcomeMessage() {
  const nameInput = document.getElementById('name');
  const name = nameInput.value;
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  welcomeMessage.textContent = `Witaj, ${name}!`;
  registrationButton.style.display = 'none';
  logoutButton.style.display = 'inline-block';
  modalRegistration.style.display = 'none';
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
}

function logout() {
  welcomeMessage.textContent = '';
  registrationButton.style.display = 'inline-block';
  logoutButton.style.display = 'none';
}

const registrationForm = document.querySelector('#registerModal form');
registrationForm.addEventListener('submit', function (e) {
  e.preventDefault();
  displayWelcomeMessage();
});


const weatherButton = document.getElementById('weather-button');
const modalWeather = document.getElementById('weatherModal');
const closeWeather = document.querySelector('.modal-content .close');

weatherButton.addEventListener('click', openWeatherModal);
window.addEventListener('click', outsideClickWeather);

function openWeatherModal() {
  modalWeather.style.display = 'block';
}

function outsideClickWeather(e) {
  if (e.target === modalWeather) {
    modalWeather.style.display = 'none';
  }
}


const input = document.getElementById('miasto');
const button = document.getElementById('check');
const errorMessage = document.querySelector('.error')
const date = document.querySelector('.date');
const cityName = document.querySelector('.city_name');
const img = document.getElementById('obrazekpogodowy');
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

function getWeather(){
    const apiCity = input.value;
    const URL = apiLink + apiCity + apiKey + apiUnits + apiLang;

    axios.get(URL).then(response => {
        console.log(response.data);
        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
        img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
        temperature.textContent = `${Math.round(response.data.main.temp)} C`;
        temperatureDescription.textContent = `${response.data.weather[0].description}`;
        feelsLike.textContent = `${Math.round(response.data.main.feels_like)}`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        humidity.textContent = `${response.data.main.humidity} %`;
        windSpeed.textContent = `${Math.round((response.data.wind.speed) * 3,6)} km/h`;
        clouds.textContent = `${response.data.clouds.all} %`;
        errorMessage.textContent = '';
    }).catch(error => {
        console.log("error");
        if(error.response.data.cod !== '200'){
            errorMessage.textContent = `${error.response.data.message}`;
        }
        [clouds, windSpeed, humidity, pressure, cityName, temperature, temperatureDescription, feelsLike].forEach(el => {
            el.textContent = '';
        })
        img.src = '';
    }).finally(() => {
        input.value = '';
    })
}

function getWeatherByEnter(e) {
    if(e.key === 'Enter'){
        getWeather();
    }
}

input.addEventListener('keypress', getWeatherByEnter)
button.addEventListener('click', getWeather);