let bannerImage = document.getElementById('bannerImg');
let result = document.getElementById('res');
let img = document.getElementById('tableBanner');

bannerImage.addEventListener('change', function() {
    let file = this.files[0];
    let maxSize = 3000000;

    if (file.type.indexOf('image') < 0) {
        res.innerHTML = 'invalid type';
        return;
    }

    let fReader = new FileReader();
    fReader.onload = function() {
            img.onload = function() {
                // if localStorage fails, it should throw an exception
                try {
                    // pass the ratio of the file size/maxSize to your toB64 func in case we're already out of scope
                    localStorage.setItem("imgData", getBase64Image(img, (file.size / maxSize), file.type));
                } catch (e) {
                    let msg = e.message.toLowerCase();
                    // We exceeded the localStorage quota
                    if (msg.indexOf('storage') > -1 || msg.indexOf('quota') > -1) {
                    // we're dealing with a jpeg image :  try to reduce the quality
                        if (file.type.match(/jpe?g/)) {
                            console.log('reducing jpeg quality');
                            localStorage.setItem("imgData", getBase64Image(img, (file.size / maxSize), file.type, 0.7));
                        }
                        // we're dealing with a png image :  try to reduce the size
                        else {
                            console.log('reducing png size');
                            // maxSize is a total approximation I got from some tests with a random pixel generated img
                            let maxPxSize = 750000,
                            imgSize = (img.width * img.height);
                            localStorage.setItem("imgData", getBase64Image(img, (imgSize / maxPxSize), file.type));

                            
                        }
                    }
                }
            }
    img.src = fReader.result;
    };
fReader.readAsDataURL(file);
});

function getBase64Image(img, sizeRatio, type, quality) {
    // if we've got an svg, don't convert it, svg will certainly be lighter than any pixel image
    if (type.indexOf('svg+xml') > 0) return img.src;
    // if we've got a jpeg
    if (type.match(/jpe?g/)) {
        // and the sizeRatio is okay, don't convert it
        if (sizeRatio <= 1) return img.src;
    }
    // if we've got some other image type
    else type = 'image/png';
    if (!quality) quality = 1;
    var canvas = document.createElement("canvas");
    // if our image file is too large, then reduce its size
    canvas.width = (sizeRatio > 1) ? (img.width / sizeRatio) : img.width;
    canvas.height = (sizeRatio > 1) ? (img.height / sizeRatio) : img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    // if we already tried to reduce its size but it still failing, then reduce the jpeg quality
    var dataURL = canvas.toDataURL(type, quality);
    return dataURL;
}

function fetchimage() {
    var dataImage = localStorage.getItem('imgData');
    if (dataImage!=null){
            let userInput = document.getElementById('bannerImg');
            userInput.style.opacity = "0";
            userInput.style.margin = "-10px"
        }
    else{
            changeAvatar();
        }
    img.src = dataImage;
}

// Call fetch to get image from localStorage.
fetchimage();

let avatar = document.getElementById('tableBanner');
avatar.addEventListener('click', function(){changeAvatar()});

function changeAvatar(){
    let userInput = document.getElementById('bannerImg');
    userInput.style.opacity = "1";
    userInput.style.margin = "10px"
    userInput.style.marginLeft = "25%"
}


let btn = document.getElementById('calculate_btn');
btn.addEventListener('click', function(){Calculate()});


document.addEventListener("DOMContentLoaded", function (event){
    let item = localStorage.getItem('crystall');
    if (item != null){
        document.getElementById('userCristall').value = item;
        graphics_blue(item);
    }
    item = localStorage.getItem('lectures');
    if (item != null){
        graphics_orange(item);
    }
    let march = localStorage.getItem('March');
    if (march == null){
        march = 6;
    }
    let april = localStorage.getItem('April');
    if (april == null){
        april = 8;
    }
    let may = localStorage.getItem('May');
    if (may == null){
        may = 6;
    }
    let june = localStorage.getItem('June');
    if (june == null){
        june = 1;
    }
    let july = localStorage.getItem('July');
    if (july == null){
        july = 6;
    }
    let august = localStorage.getItem('August');
    if (august == null){
        august = 9;
    }
    let september = localStorage.getItem('September');
    if (september == null){
        september = 15;
    }
    let october = localStorage.getItem('October');
    if (october == null){
        october = 3;
    }
    chartGraph(march, april, may, june, july, august, september, october);
})

function Calculate(){
    document.querySelector('.dashboard__userBlock__progress').classList.remove='animation';
    let cristall = document.getElementById("userCristall");
    let reg = /^[ 0-9]+$/;
    if (cristall.value==""){
        cristall.style.borderColor = "red";
        alert('Input the number of crystals!')
    }
    else 
        if(Number(cristall.value) > 87){
        alert('Too many crystals!');
        }
        else{
            localStorage.setItem('crystall', cristall.value);
            cristall.style.borderColor = "#cfcae4";
            document.getElementById('gcristall').innerHTML="";
            document.getElementById('glection').innerHTML="";
            graphics_blue(Number(cristall.value));
            let countLec = prompt('What week did you stop at the lectures?');
            if (reg.test(countLec)){
                if(countLec > 31){
                    alert('Too many!');
                }
                else{
                    localStorage.setItem('lectures', countLec);
                    graphics_orange(countLec);
                }
            }
            else{
                alert('Input the number!');
            }
        }
    let graphic = [];
    graphic[0] = prompt('How much homework did you do in March');
    if(reg.test(graphic[0])){
        localStorage.setItem('March', graphic[0]);
        graphic[1] = prompt('How much homework did you do in April?');
        if(reg.test(graphic[1])){
            localStorage.setItem('April', graphic[1]);
            graphic[2] = prompt('How much homework did you do in May?');
            if(reg.test(graphic[2])){
                localStorage.setItem('May', graphic[2]);
                graphic[3] = prompt('How much homework did you do in June?');
                if(reg.test(graphic[3])){
                    localStorage.setItem('June', graphic[3]);
                    graphic[4] = prompt('How much homework did you do in July?');
                    if(reg.test(graphic[4])){
                        localStorage.setItem('July', graphic[4]);
                        graphic[5] = prompt('How much homework did you do in August?');
                        if(reg.test(graphic[5])){
                            localStorage.setItem('August', graphic[5]);
                            graphic[6] = prompt('How much homework did you do in September?');
                            if(reg.test(graphic[6])){
                                localStorage.setItem('September', graphic[6]);
                                graphic[7] = prompt('How much homework did you do in October?');
                                if(reg.test(graphic[7])){
                                    localStorage.setItem('October', graphic[7]);
                                }
                                else{
                                    alert('Input the number!');
                                }
                            }
                            else{
                                alert('Input the number!');
                            }
                        }
                        else{
                            alert('Input the number!');
                        }
                    }
                    else{
                        alert('Input the number!');
                    }
                }
                else{
                    alert('Input the number!');
                }
            }
            else{
                alert('Input the number!');
            }
            
        }
        else{
            alert('Input the number!');
        }
    }
    else{
        alert('Input the number!');
    }
}

var ProgressBar = require('progressbar.js');

function graphics_blue(userInput){
    document.querySelector('.dashboard__userBlock__progress').classList.add='animation';
    var bar = new ProgressBar.Line(gcristall, {
        strokeWidth: 3,
        easing: 'easeInOut',
        duration: 1400,
        color: 'rgb(117, 206, 249)',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '80%', height: '100%'},
        text: {
            style: {
            // Text color.
            // Default: same as stroke color (options.color)
            color: '#999',
            position: 'inherit',
            right: '0',
            top: '30px',
            padding: 0,
            margin: 10,
            transform: null,
            right: '20px'
            },
            autoStyleContainer: false
        },
        from: {color: '#FFEA82'},
        to: {color: '#ED6A5A'},
        step: (state, bar) => {
            bar.setText('Cristalls ' + Math.round((userInput * 100)/87) + ' %');
        }
        });
        
        bar.animate(1.0);  // Number from 0.0 to 1.0
}
    

function graphics_orange(countLec){
    var bar = new ProgressBar.Line(glection, {
        strokeWidth: 3,
        easing: 'easeInOut',
        duration: 1400,
        color: 'rgb(255, 205, 117)',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '80%', height: '100%'},
        text: {
            style: {
            // Text color.
            // Default: same as stroke color (options.color)
            color: '#999',
            position: 'inherit',
            right: '0',
            top: '30px',
            padding: 0,
            margin: 10,
            transform: null,
            right: '20px'
            },
            autoStyleContainer: false
        },
        from: {color: '#FFEA82'},
        to: {color: '#ED6A5A'},
        step: (state, bar) => {
            bar.setText('Lectures ' + Math.round((countLec * 100)/31) + ' %');
        }
        });
        bar.animate(1.0);  // Number from 0.0 to 1.0
}

let Chart = require('Chart.js');

function chartGraph(march, april, may, june, july, august, september, october){
    var chart    = document.getElementById('chart').getContext('2d'),
    gradient = chart.createLinearGradient(0, 0, 0, 450);

    gradient.addColorStop(0, 'rgba(111, 58, 207, 0.5)');
    gradient.addColorStop(0.5, 'rgba(111, 58, 207, 0.25)');
    gradient.addColorStop(1, 'rgba(111, 58, 207, 0)');


    var data  = {
    labels: [ 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October'],
    datasets: [{
            label: 'My homework',
            backgroundColor: gradient,
            fill: true,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#6f3acf',
            data: [march, april, may, june, july, august, september, october]
    }]
    };


    var options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        easing: 'easeInOutQuad',
        duration: 520
    },
    scales: {
        xAxes: [{
            gridLines: {
                color: 'rgba(200, 200, 200, 0.05)',
                lineWidth: 1
            }
        }],
        yAxes: [{
            gridLines: {
                color: 'rgba(200, 200, 200, 0.08)',
                lineWidth: 1
            }
        }]
    },
    elements: {
        line: {
            tension: 0.4
        }
    },
    legend: {
        display: false
    },
    point: {
        backgroundColor: 'white'
    },
    tooltips: {
        titleFontFamily: 'Open Sans',
        backgroundColor: 'rgba(0,0,0,0.3)',
        titleFontColor: 'red',
        caretSize: 5,
        cornerRadius: 2,
        xPadding: 10,
        yPadding: 10
    }
    };


    var chartInstance = new Chart(chart, {
    type: 'line',
    data: data,
        options: options
    });
}


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

let userName= document.getElementById('username');
userName.addEventListener('click', function(){ getName()});

function getName() {
  let name = prompt("What's your name?");
  if (name == null || name == ''){
    name = 'User';
  }
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
    seconds = "0" + seconds;
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

    

