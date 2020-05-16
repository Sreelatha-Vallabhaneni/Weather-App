const API_KEY = "83c8eb465eeda9a497ff8013c1364722";

const input = document.querySelector(".city-name");
input.addEventListener("keypress", (evt) => {
  const inputValue = input.value.toLowerCase();
  const ROOT_URL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    inputValue +
    "&appid=" +
    API_KEY;
  if (evt.keyCode == 13) {
    fetch(ROOT_URL)
      .then((res) => res.json())
      .then((json) => renderWeatherDetails(json));
  }
});

function renderWeatherDetails(json) {
  document.querySelector(".message").textContent = `City Name: ${json.name}`; // choosen city
  //temperature
  const temperature = document.querySelector(".temperature");
  temperature.textContent = Math.round(json.main.temp - 273.15) + "°C";
  // Icon for the weather type
  document.querySelector("img").src =
    "http://openweathermap.org/img/wn/" + json.weather[0].icon + ".png";
  document.querySelector(".icon-reltd-info").textContent =
    json.weather[0].description;
  //wind speed
  document.querySelector(".wind-speed").textContent =
    "Wind Speed:" + " " + json.wind.speed + "m/s";
  //How clowdy it is
  document.querySelector(".how-cloudy").textContent =
    "clouds:" + " " + json.clouds.all + "%";
  //When sunrise and sunset is
  document.querySelector(".sunrise").textContent = `Sunrise: ${new Date(
    json.sys.sunrise * 1000
  ).toLocaleTimeString()}`;
  document.querySelector(".sunset").textContent = `Sunset: ${new Date(
    json.sys.sunset * 1000
  ).toLocaleTimeString()}`;
}
