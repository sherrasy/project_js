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
    img.src = dataImage;
}

// Call fetch to get image from localStorage.
fetchimage();

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
    chartGraph();
})

function Calculate(){
    document.querySelector('.dashboard__userBlock__progress').classList.remove='animation';
    let cristall = document.getElementById("userCristall");
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
            let reg = /^[ 0-9]+$/
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

function chartGraph(){
    var chart    = document.getElementById('chart').getContext('2d'),
    gradient = chart.createLinearGradient(0, 0, 0, 450);

    gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
    gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');


    var data  = {
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June' ],
    datasets: [{
            label: 'Custom Label Name',
            backgroundColor: gradient,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#911215',
            data: [50, 55, 80, 81, 54, 50]
    }]
    };


    var options = {
    responsive: true,
    maintainAspectRatio: true,
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



    

