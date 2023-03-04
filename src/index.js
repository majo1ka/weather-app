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
let curDate = document.querySelector("#todaysDate");
curDate.innerHTML = formatDate(now);
//search bar
let citySearch = document.querySelector("#citySearchbar");
citySearch.addEventListener("submit", showCity);
//unit selector
function celsiusSelect(event) {
  event.preventDefault();
  let celTemp = 9;
  let tempCel = document.querySelector("#unitTemp");
  tempCel.innerHTML = celTemp;
}
let cels = document.querySelector("#celsiusS");
cels.addEventListener("click", celsiusSelect);

function fahrenheitSelect(event) {
  event.preventDefault();
  let fahrTemp = 48;
  let tempFahr = document.querySelector("#unitTemp");
  tempFahr.innerHTML = fahrTemp;
}
let fahrs = document.querySelector("#fahrS");
fahrs.addEventListener("click", fahrenheitSelect);
//current position

//show temp by city name
function forecast(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let pressure = response.data.main.pressure;
  let tempDisplay = document.querySelector("#unitTemp");
  tempDisplay.innerHTML = temperature;
  let cityNow = document.querySelector("#city-name");
  cityNow.innerHTML = city;
  let windNow = document.querySelector("#windShow");
  windNow.innerHTML = wind;
  let pressureNow = document.querySelector("#pressureCard");
  pressureNow.innerHTML = pressure;
}
function showCity(position) {
  let key = "ed55b36e362d8733f7d859247cedeaf2";
  let searchCity = document.querySelector("#cityInput").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${key}&units=metric`;
  axios.get(url).then(forecast);
}
function currentLocation(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
  let urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(urlCurrent).then(forecast);
}
let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", nav);
function nav(curloc) {
  navigator.geolocation.getCurrentPosition(currentLocation);
}