const init = async () => {
    let data = await getData();
    navigator.geolocation.getCurrentPosition(getLocation);

    console.log(data);
    console.log(data.forecast.weatherreport.summary);

    navigator.geolocation.getCurrentPosition(showPosition);

    setTimeout(function() {
        console.log(cityName)
    }, 3000)
}

var cityName = null;

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

function getLocation(position) {
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

// UTILITIES
async function getCurrentLocationData(lat, lon) {
    let temp = await fetch("https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + lon)
    .then((x) => {
        return x.json()
    })
    .catch((error) => {
        console.error(error)
    })
    return temp;
}

function getCurrentLocation(stuff) {
    if(stuff.address.city) {
        return stuff.address.city;
    } else if(stuff.address.village) {
        return stuff.address.village;
    }
}

async function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
    " Longitude: " + position.coords.longitude);

    let locData = await getCurrentLocationData(position.coords.latitude, position.coords.longitude);
    //console.log(getCurrentLocation(locData))
    cityName = getCurrentLocation(locData);
}

document.addEventListener("DOMContentLoaded", () => {
    init();
})