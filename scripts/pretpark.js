const init = async () => {
    data = await getData();
    let pretparkId = getParam("id")
    console.log(pretparkId)
    
    registerPark("efteling", "Efteling", "De Efteling is een pretpark in Kaatsheuvel, Brabant. Het is een van de grootste pretparken van Nederland, bekend van onder meer attracties als De Python, Baron 1898 en Droomvlucht.", "img/efteling.jpg", "4")
    let park = getPark(pretparkId)
    console.log(park)

    document.querySelector(".pretparkTitle").innerHTML = park.name
    document.querySelector(".pretparkImage").src = park.imgPath
    document.querySelector(".pretparkDescription").innerHTML = park.description
    document.querySelector(".pretparkVoorspelling").innerHTML = data.actual.stationmeasurements[park.weatherStationId].weatherdescription

    document.querySelector(".iconWind").innerHTML = data.actual.stationmeasurements[park.weatherStationId].windspeed + " km/h wind"
    document.querySelector(".iconTemperature").innerHTML = data.actual.stationmeasurements[park.weatherStationId].temperature + " ºC"
    document.querySelector(".iconRain").innerHTML = data.actual.stationmeasurements[park.weatherStationId].rainFallLastHour + "% neerslag"
    document.querySelector(".iconTime").innerHTML = data.actual.stationmeasurements[park.weatherStationId].timestamp
}

let data = null;
let parks = []

function registerPark(id, name, description, imgPath, weatherStationId) {
    parks.push({
        "id": id,
        "name": name,
        "description": description,
        "imgPath": imgPath,
        "weatherStationId": weatherStationId
    })
}

function getPark(id) {
    for (var i = 0; i < parks.length; i++) {
        if(parks[i].id == id) {
            return parks[i]
        }
    }
}

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

function getParam(id) {
    return new URLSearchParams(window.location.search).get(id)
}

document.addEventListener("DOMContentLoaded", () => {
    init();
})