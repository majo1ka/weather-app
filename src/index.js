//show date
let now = new Date();
function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let mins = now.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let today = days[now.getDay()];
  return `${today} ${hours}:${mins}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  return days[day];
}
let curDate = document.querySelector("#todaysDate");
curDate.innerHTML = formatDate(now);
//search bar
let citySearch = document.querySelector("#citySearchbar");
citySearch.addEventListener("submit", handleSubmit);
//unit selector
function celsiusSelect(event) {
   event.preventDefault();
   celsiusS.classList.add("active")
   fahrs.classList.remove("active");
  let tempCel = document.querySelector("#unitTemp");
  tempCel.innerHTML = Math.round(celsiusTemperature);

}
let cels = document.querySelector("#celsiusS");
cels.addEventListener("click", celsiusSelect);
let celsiusTemperature = null;

function fahrenheitSelect(event) {
  event.preventDefault();
  let tempFahr = document.querySelector("#unitTemp");
  celsiusS.classList.remove("active");
  fahrs.classList.add("active");
  let fahrTemp = (celsiusTemperature * 9) / 5 + 32;
  tempFahr.innerHTML = Math.round(fahrTemp);
}
let fahrs = document.querySelector("#fahrS");
fahrs.addEventListener("click", fahrenheitSelect);
let celsiusS = document.querySelector("#celsiusS");
celsiusS.addEventListener("click", celsiusSelect);

function getForecast(coordinates) {
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showforecast);
}
//show temp by city name
function showWeather(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let tempDisplay = document.querySelector("#unitTemp");
  tempDisplay.innerHTML = temperature;
  let cityNow = document.querySelector("#city-name");
  cityNow.innerHTML = city;
  let windNow = document.querySelector("#windShow");
  windNow.innerHTML = wind;
  let iconChange = document.querySelector("#tempIcon");
 
  iconChange.setAttribute(
    "src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  )
  let weatherDesc = document.querySelector("#desc")
  weatherDesc.innerHTML = response.data.weather[0].description;
  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
  }
function showCity(city) {
  let key = "ed55b36e362d8733f7d859247cedeaf2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault()
let searchCity = document.querySelector("#cityInput");
showCity(searchCity.value);
}
function currentLocation(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(urlCurrent).then(showWeather);
}
let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", nav);
function nav(curloc) {
  curloc.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
//forecast function
function showforecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
if (index < 6) {
  
  forecastHTML = forecastHTML + `
  
  <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="90"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
        </div>
        </div>`; }
        });
      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
 }
showCity("Prague");