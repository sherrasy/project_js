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