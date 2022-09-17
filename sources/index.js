let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";

let today = new Date();
let day = document.querySelector("#today");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let date = document.querySelector("#date");

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let time = document.querySelector("#time");
let form = document.querySelector("#search-form");
//let temperature = document.querySelector("#temperature");
//let celsiusTemperature = document.querySelector("#celius");
//let fahrenheitTemperature = document.querySelector("#fahrenheit");
let sequence = ["st", "nd", "rd", "th"];

if (today.getDate() === 1) {
  sequence = sequence[0];
}
if (today.getDate() === 2) {
  sequence = sequence[1];
}
if (today.getDate() === 3) {
  sequence = sequence[2];
} else {
  sequence = sequence[3];
}

day.innerHTML = `Today/` + days[today.getDay()];
date.innerHTML = `${months[today.getMonth()]} ${today.getDate()}${sequence}`;
time.innerHTML = `${today.getHours()}:${today.getMinutes()}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

form.addEventListener("submit", search);

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;

  let cityName = response.data.name;
  let city = document.querySelector("#city");
  city.innerHTML = cityName;

  let descriptionElement = document.querySelector("#description");
  let description = response.data.weather[0].main;
  descriptionElement.innerHTML = description;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity: ${humidity} %`;
  let hiTempElement = document.querySelector("#hiTemp");
  let hiTemp = Math.round(response.data.main.temp_max);
  hiTempElement.innerHTML = `Hi: ${hiTemp} °C`;
  let lowTempElement = document.querySelector("#lowTemp");
  let lowTemp = Math.round(response.data.main.temp_min);
  lowTempElement.innerHTML = `Low: ${lowTemp} °C`;
}

let button = document.querySelector("#button");
button.addEventListener("click", getCurrentPosition);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
/*function showCity(response) {
  console.log(response.data.sys.name);

  //let cityName = document.querySelector("#city");
}*/
/*function celsiusToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = 23 * 1.8 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

fahrenheit.addEventListener("click", celsiusToFahrenheit);

function fahfrenheitToCelsius(event) {
  event.preventDefault();
  temperature.innerHTML = 23;
}

celsius.addEventListener("click", fahfrenheitToCelsius);
*/
