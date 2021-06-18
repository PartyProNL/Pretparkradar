const init = async () => {
    data = await getData();
    let pretparkId = getParam("id")
    console.log(pretparkId)
    
    registerPark("efteling", "Efteling", "De Efteling is een pretpark in Kaatsheuvel, Brabant. Het is een van de grootste pretparken van Nederland, bekend van onder meer attracties als De Python, Baron 1898 en Droomvlucht.", "img/efteling.jpg", "4")
    registerPark("walibi", "Walibi Holland", "Walibi Holland is een pretpark gelegen in Biddinghuizen, Flevoland. Walibi Holland heeft heel wat namen gehad, zoals Walibi World, Six Flags Holland en Flevohof. Tegenwoordig kan je er allemaal grote achtbanen vinden voor thrillseekers.", "img/walibi.jpg", "4")
    registerPark("duinrell", "Duinrell", "Duinrell is een klein pretpark gelegen in de Wassenaar in de duinen. Duinrell is bekend van onder andere het Tikibad en de achtbaan Falcon. De OSG gaat hier jaarlijks naartoe.", "img/duinrell.jpg", "4")
    registerPark("toverland", "Toverland", "Toverland is een best nieuw park gelegen in Sevenum in Limburg. Het park is begonnen met een indoorhal, maar heeft tegenwoordig ook allemaal grote achtbanen, zoals Fenix en Troy.", "img/toverland.jpg", "4")
    registerPark("slagharen", "Slagharen", "Slagharen (voorheen ook wel bekend als Ponypark Slagharen) is een pretpark gelegen in Overijssel. Het heeft meerdere achtbanen, heel wat oude kermisattracties en een waterpark.", "img/slagharen.jpeg", "4")
    registerPark("hellendoorn", "Hellendoorn", "Avonturenpark Hellendoorn is een van de oudste pretparken in Nederland. Het heeft tegenwoordig een paar achtbanen en een slidepark. (Een slidepark is een waterpark met alleen maar glijbanen)", "img/hellendoorn.jpg", "4")
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