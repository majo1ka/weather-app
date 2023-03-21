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

//show temp by city name
function showWeather(response) {
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
  let iconChange = document.querySelector("#tempIcon");
  iconChange.setAttribute(
    "src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  )
  let weatherDesc = document.querySelector("#desc")
  weatherDesc.innerHTML = response.data.weather[0].description;
  celsiusTemperature = response.data.main.temp;

  }
function showCity(city) {
  let key = "ed55b36e362d8733f7d859247cedeaf2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault()
let searchCity = document.querySelector("#cityInput").value;
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
function showforecast() {
  let forecast = document.querySelector("#weatherforecast");
  forecast.innerHTML = "Forecast";
 }
showCity("Prague");