const init = async () => {
    data = await getData();
    navigator.geolocation.getCurrentPosition(saveCurrentPosition);
    console.log(getNearestWeatherStation("temperature"))
    var userWeatherStationId = getIndex(getNearestWeatherStation("temperature"))

    document.querySelector(".pretparkVoorspelling").innerHTML = data.actual.stationmeasurements[userWeatherStationId].weatherdescription
    document.querySelector(".iconWind").innerHTML = data.actual.stationmeasurements[userWeatherStationId].windspeed + " km/h wind"
    document.querySelector(".iconTemperature").innerHTML = data.actual.stationmeasurements[userWeatherStationId].temperature + " ºC"
    document.querySelector(".iconRain").innerHTML = data.actual.stationmeasurements[userWeatherStationId].rainFallLastHour + "% neerslag"
    document.querySelector(".iconTime").innerHTML = data.actual.stationmeasurements[userWeatherStationId].timestamp
    document.querySelector(".weerbericht").innerHTML = data.forecast.weatherreport.summary
    document.querySelector(".locatieInfo").innerHTML = "Deze info komt van weerstation " + data.actual.stationmeasurements[userWeatherStationId].stationname + ". Dit is als het goed is het dichtsbijzijnde weerstation van jouw locatie."

    if(data.actual.stationmeasurements[userWeatherStationId].rainFallLastHour > 0) {
        document.querySelector(".pretparkImage").src = "img/rain.jpg"
    } else {
        if(data.actual.stationmeasurements[userWeatherStationId].temperature < 0) {
            document.querySelector(".pretparkImage").src = "img/snow.png"
        } else if(data.actual.stationmeasurements[userWeatherStationId].temperature < 20) {
            document.querySelector(".pretparkImage").src = "img/normal.jpg"
        } else {
            document.querySelector(".pretparkImage").src = "img/sunny.jpg"
        }
    }
}

var data = null;
var cityName = null;
var currentLat = null;
var currentLon = null;
var today = new Date();

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

function saveCurrentPosition(position) {
    // Is er een position meegegeven?
    if(position !== null) {
        // Opslaan in localstorage
        currentLat = position.coords.latitude;
        currentLon = position.coords.longitude;
        localStorage.currentLatLS = currentLat;
        localStorage.currentLonLS = currentLon;
    } else {
        // Geen positie meegegeven, ophalen uit local storage
        currentLat = localStorage.currentLatLS;
        currentLon = localStorage.currentLonLS;
    }
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

function getNearestWeatherStation(searchValue) {

    // All weerstations
    weerstations = data.actual.stationmeasurements;

    // Variabelen om mee te werken
    var dichtbij;
    var afstand = 1000;

    // Ieder weerstation aflopen
    for (var weerstation in weerstations) {
        if (weerstations.hasOwnProperty(weerstation)) {

            // Afstand bepalen ten opzichte van eigen locatie en locatie weerstation
            tempAfstand = getDistanceFromLatLonInKm(weerstations[weerstation].lat, weerstations[weerstation].lon, currentLat, currentLon);
            //console.log(weerstations[weerstation].stationname + ": " + tempAfstand + "km");

            // Is deze afstand korter dan een eerder gevonden weerstation?
            if(afstand < tempAfstand) {
                // EN bevat dit weerstation de gevraagde informatie?
                if(weerstations[weerstation].hasOwnProperty(searchValue) !== undefined) {
                    // Dan is dit nu de dichstbijzijnde
                    afstand = tempAfstand;
                    dichtbij = weerstations[weerstation];
                }
            }
        }
    }

    return dichtbij;
}

function getIndex(weatherStation) {
    for (var i = 0; i < data.actual.stationmeasurements.length; i++) {
        if(data.actual.stationmeasurements[i].stationname == weatherStation.stationname) {
            return i
        }
    }
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
