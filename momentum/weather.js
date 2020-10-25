// 'use strict';

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const airHumidity = document.querySelector('.air-humidity');
const windSpeed = document.querySelector('.wind-speed');
const city = document.querySelector('.city');
const incorrectInputCity = document.querySelector('.incorrect-input-city');

// Get City
function getCity() {
  if (localStorage.getItem('city') === null || localStorage.getItem('city').trim() === '') {
    city.value = '[Enter City]';
  } else {
    city.value = localStorage.getItem('city');
  }
}

// Set City
function setCity(e) {
  if (e.type === 'keydown') {
    // Make sure enter is pressed
    if (e.key === 'Enter') {
      valueInputProcessing(city, 'city', 'City', e);
      getWeather();
    }
  } else {
    // трим удаляет пробелы с краев строки или если в строке одни пробелы то возвращает пустую строку, проверка на ввод пустого значения
    valueInputProcessing(city, 'city', 'City', e);
    getWeather();
  }
}

function valueInputProcessing(element, attribute, placeholder, evt) {

  if (evt.target.value.trim() === '') {
    if (localStorage.getItem(attribute) === null) {
      element.value = `[Enter ${placeholder}]`;
      element.blur();
      return
    }
    element.value = localStorage.getItem(attribute);
  }
  localStorage.setItem(attribute, evt.target.value);
  element.blur();
}

city.addEventListener('keydown', setCity);
city.addEventListener('blur', setCity);

{
  city.addEventListener('focus', (evt) => {
    evt.target.value = '';
  })
}

getCity();

document.addEventListener('DOMContentLoaded', getWeather);

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=d037ba7d9b35260453ca0b4e23677542&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (res.status !== 200) {
    city.value = '[Enter City]';
    incorrectInputCity.classList.add('incorrect-input-city_on');
    weatherIcon.className = '';
    temperature.textContent = '';
    airHumidity.textContent = '';
    windSpeed.textContent = '';
    weatherDescription.textContent = '';
    return;
  }
  incorrectInputCity.classList.remove('incorrect-input-city_on');

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp} °C (feels like ${data.main.feels_like} °C)`;
  airHumidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind speed: ${data.wind.speed} m/sec`;
  weatherDescription.textContent = data.weather[0].description;
}