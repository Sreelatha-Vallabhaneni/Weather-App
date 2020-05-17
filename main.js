const API_KEY = "83c8eb465eeda9a497ff8013c1364722";

const input = document.querySelector(".city-name");
input.addEventListener("keypress", (evt) => {
  const inputValue = input.value.toLowerCase();
  const ROOT_URL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    inputValue +
    "&appid=" +
    API_KEY;
  if (evt.keyCode === 13) {
    fetch(ROOT_URL)
      .then((res) => res.json())
      .then((data) => renderWeatherDetails(data));
  }
});

// Render weather information
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
  // Render location on Google Map
  const mapDiv = document.getElementById("map");
  mapDiv.innerHTML = `<div class="mapouter"><div class="gmap_canvas"><iframe width="650" height="450" id="gmap_canvas" src="https://maps.google.com/maps?q=${json.name}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div>`;
}

//Use my current position optional
document.querySelector(".btn").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const BASE_URL =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      API_KEY;
    fetch(BASE_URL)
      .then(response => response.json())
      //Save my location optional - when click the current position button
      .then(data => {
        renderWeatherDetails(data);
        localStorage.setItem("City", data.name);
        localStorage.setItem("Country", data.sys.country);
      });
  });    
});

