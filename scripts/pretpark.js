const init = async () => {
    let pretparkId = GetURLParameter("id")
    
    registerPark("efteling", "Efteling", "../FOTOPATH HIER", "4")
    let park = getPark(pretparkId)
    console.log(park)
}

let parks = []

function registerPark(id, name, imgPath, weatherStationId) {
    parks.push({
        "id": id,
        "name": name,
        "imgPath": imgPath,
        "weatherStationId": weatherStationId
    })
}

function getPark(id) {
    for (var i = 0; i < arrayLength; i++) {
        if(parks[i].id == id) {
            return parks[i]
        }
    }
}

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}​

document.addEventListener("DOMContentLoaded", () => {
    init();
})