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

const addNoteBtn = document.getElementById("addNote");
const deleteNoteBtn = document.getElementsByClassName("deleteNote");
const deleteAllBtn = document.getElementById("deleteAll");
const noteInput = document.querySelector("input.note__text");
const ul = document.querySelector("ul.result__list");

addNoteBtn.onclick = function addNote() {
  const newLi = document.createElement("li");
  const text = document.createElement("span");
  text.classList.add("note-body");
  const deleteNoteBtn = document.createElement("button");

  const noteText = noteInput.value;
  if (!noteInput.value) {
    alert("Add text of your note");
  } else {
    text.append(noteText);
    deleteNoteBtn.innerHTML = "X";
    deleteNoteBtn.classList.add("deleteNote");
    ul.appendChild(newLi).append(text, deleteNoteBtn);
    noteInput.value = "";
  }
  deleteNote(deleteNoteBtn);

  localStorage.setItem("notes", ul.innerHTML);
};

function deleteNote(element) {
  element.addEventListener("click", (event) => {
    element.parentElement.remove();
    event.stopPropagation();
    localStorage.setItem("notes", ul.innerHTML);
  });
}

deleteAllBtn.onclick = function deleteNotes() {
  ul.innerHTML = "";
  localStorage.removeItem("notes");
};

function getName() {
  const name = prompt("What's your name?");
  localStorage.setItem("username", name);
  document.getElementById("username").innerHTML = name;
}

function getDate() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (day < 10) {
    day = "0" + day;
  } else {
    day;
  }
  if (month < 10) {
    month = "0" + month;
  } else {
    month;
  }
  if (hours < 10) {
    hours = "0" + hours;
  } else {
    hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  } else {
    minutes;
  }
  if (seconds < 10) {
    daminutesy = "0" + minutes;
  } else {
    seconds;
  }

  year = year.toString().slice(-2);
  const dateInfo = document.getElementById("date");
  dateInfo.innerHTML = `${day}.${month}.${year}`;
  const timeInfo = document.getElementById("time");
  timeInfo.innerHTML = `${hours}:${minutes}:${seconds}`;
  setTimeout("getDate()", 1000);
}

function showFact() {
  const now = new Date();
  const m = now.getMonth();
  const d = now.getDate();
  const factInfo = document.getElementById("fact");
  fetch("http://numbersapi.com/" + m + "/" + d + "/date")
    .then((response) => response.text())
    .then((fact) => (factInfo.innerHTML = "<p>Interesting fact:</p>" + fact));
}

document.addEventListener("DOMContentLoaded", function (event) {
  getWeather();
  getDate();
  showFact();
  const username = localStorage.getItem("username");
  if (username) {
    document.getElementById("username").innerHTML = username;
  } else {
    getName();
  }

  const data = localStorage.getItem("notes");
  if (data) {
    ul.innerHTML = data;
  }
  const deleteNoteBtns = document.getElementsByClassName("deleteNote");
  for (const button of deleteNoteBtns) {
    deleteNote(button);
  }
});
