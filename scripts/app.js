const init = async () => {
    //getData();
    data = getData2();
    getLocation();

    console.log("test");
    console.log(data);
}

var data;
var currentLat;
var currentLon;

async function getData() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if(this.readyState === 4 && this.status === 200) {
            data = JSON.parse(this.responseText);
            console.log("Loaded Buienradar data, here it is: " + data);
        }
    }

    request.open("GET", "https://api.buienradar.nl/data/public/2.0/jsonfeed", false);
    request.send();
}

async function getData2() {
    let temp = await fetch("https://api.buienradar.nl/data/public/2.0/jsonfeed")
    .then((x) => {
        return x.json()
    })
    .catch((error) => {
        console.error(error)
    })
    return null;
}

function getLocation() {
    if(localStorage.currentLatS && localStorage.currentLonLS) {
        currentLat = position.coords.latitude;
        currentLon = position.coords.longitude;
    } else {
        if(navigator.geolocation) {
            currentLat = localStorage.currentLatLS;
            currentLon = localStorage.currentLonLS;
        } else {
            alert('Huidige locatie opvragen wordt helaas niet ondersteund!')
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    init();
})