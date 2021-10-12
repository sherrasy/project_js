const sendBtn = document.getElementById("sendCity");
const changeBtn = document.getElementById("changeCity");
const cityInput = document.getElementById("cityName");
let weatherIcon = document.getElementById("w-icon");

sendBtn.onclick = function getInfo() {
  getCityName();
  getWeather();
};

function getCityName() {
  const city = cityInput.value;
  if (!city) {
    alert("Enter correct city name");
  } else {
    localStorage.setItem("city", city);
  }
}

function getWeather() {
  const city = localStorage.getItem("city");
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=67ff9577f23f3f6983de8a6c9c0b3f59&units=metric"
  )
    .then((response) => response.json())
    .then((weather) => {
      document.getElementById("w-location").innerText = weather.name;
      document.getElementById("w-temp").innerText =
        "Current: " + Math.round(weather.main.temp) + "°C";
      let status = weather.weather[0].description;
      document.getElementById("w-status").innerText = status;
      document.getElementById("w-hi").innerText =
        Math.round(weather.main.temp_max) +
        "°C" +
        " / " +
        Math.round(weather.main.temp_min) +
        "°C";

      if (status == "clear sky") {
        weatherIcon.src = "assets/clear_sky.png";
      } else if (status == "few clouds") {
        weatherIcon.src = "assets/few_clouds.png";
      } else if (status == "scattered clouds") {
        weatherIcon.src = "assets/scatterd_clouds.png";
      } else if (status == "broken clouds" || status == "overcast clouds") {
        weatherIcon.src = "assets/broken_clouds.png";
      } else if (status.includes("shower rain") || status.includes("drizzle")) {
        weatherIcon.src = "assets/shower_rain.png";
      } else if (status.includes("rain")) {
        weatherIcon.src = "assets/rain.png";
      } else if (status.includes("thunderstorm")) {
        weatherIcon.src = "assets/thunderstorm.png";
      } else if (status.includes("snow")) {
        weatherIcon.src = "assets/snow.png";
      } else if (status == "mist") {
        weatherIcon.src = "assets/mist.png";
      } else {
        weatherIcon.src = "";
      }
    });
  changeBtn.classList.remove("hidden");
  cityInput.classList.add("hidden");
  sendBtn.classList.add("hidden");
}

changeBtn.onclick = function changeCity() {
  cityInput.classList.remove("hidden");
  sendBtn.classList.remove("hidden");
  changeBtn.classList.add("hidden");
};

document.addEventListener("DOMContentLoaded", function (event) {
  getWeather();
});
