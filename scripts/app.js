const init = async () => {
    let data = await getData();
    getLocation();

    console.log(data);
}

var currentLat;
var currentLon;

async function getData() {
    let temp = await fetch("https://data.buienradar.nl/2.0/feed/json")
    .then((x) => {
        return x.json()
    })
    .catch((error) => {
        console.error(error)
    })
    return temp;
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