const init = async () => {
    data = await getData();
    navigator.geolocation.getCurrentPosition(getLocation);

    console.log(data);
    console.log(data.forecast.weatherreport.summary);
    console.log(getNearestWeatherStation().stationname)

    navigator.geolocation.getCurrentPosition(showPosition);

    setTimeout(function() {
        console.log(cityName)
    }, 3000)

    // ALS HET KAN DE VARIABELEN CURRENTLAT & CURRENTLON INITIALISEREN
}

var data = null;
var cityName = null;
var currentLat = null;
var currentLon = null;

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
    cityName = getCurrentLocation(locData);
}

function getNearestWeatherStation() {
    weerstations = data.actual.stationmeasurements;

    var dichtbij;
    var afstand = 1000;

    for (var weerstation in weerstations) {
        if (weerstations.hasOwnProperty(weerstation)) {
            tempAfstand = getDistanceFromLatLonInKm(weerstations[weerstation].lat, weerstations[weerstation].lon, currentLat, currentLon);

            if(afstand > tempAfstand) {
                afstand = tempAfstand;
                dichtbij = weerstations[weerstation];
            }
        }
    }

    return dichtbij;
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2-lat1);
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

document.addEventListener("DOMContentLoaded", () => {
    init();
})