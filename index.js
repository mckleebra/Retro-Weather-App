let currentDate = new Date();
let minutes = currentDate.getMinutes();

let hours = currentDate.getHours();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayName = days[currentDate.getDay()];

let fullDate = dayName + " " + hours + ":" + minutes;

let newDate = document.querySelector(".day-week-time");
newDate.innerHTML = fullDate;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let elementForecast = document.querySelector("#forecast");

  let forecastHTML = ` <div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
   <div class="col mx-1">
            <strong>${formatDay(forecastDay.dt)}</strong><br />
            Hi: ${Math.round(forecastDay.temp.max)}°C <br />
            Lo: ${Math.round(forecastDay.temp.min)}°C
             <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            class="emoji"
          />
          </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  elementForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#city-subject-name").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  document.querySelector("#currentTemp").innerHTML =
    Math.round(celsiusTemp) + "°C";

  document.querySelector("#humidity").innerHTML =
    "Humidity: " + response.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + " mp/h";

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let weatherEmoji = document.querySelector("#top-emoji");
  weatherEmoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function Submit(event) {
  event.preventDefault();
  let city = document.querySelector("#type-city").value;
  searchCity(city);
}

let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", Submit);

// Geolocation

function findLocation(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let Key = "c5f0e59acac64258bb92ed027d20c68f";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let Url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${Key}`;

  axios.get(Url).then(showTemperature);
}
function current(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(findLocation);
}

let locationButton = document.querySelector("#currentLocation");
locationButton.addEventListener("click", current);

// Conversion

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureDisplayed = document.querySelector("#currentTemp");
  let fahrenheitFormula = (celsiusTemp * 9) / 5 + 32;
  temperatureDisplayed.innerHTML = `${Math.round(fahrenheitFormula)}°F`;
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureDisplayed = document.querySelector("#currentTemp");
  temperatureDisplayed.innerHTML = `${Math.round(celsiusTemp)}°C`;
}

let celsiusTemp = null;

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", displayFahrenheit);

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", displayCelsius);
