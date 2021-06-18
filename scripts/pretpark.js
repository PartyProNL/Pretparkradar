const init = async () => {
    let pretparkId = test("id")
    console.log(pretparkId)
    
    registerPark("efteling", "Efteling", "img/efteling.jpg", "4")
    let park = getPark(pretparkId)
    console.log(park)

    document.querySelector(".pretparkTitle").innerHTML = park.name
    document.querySelector(".pretparkImage").src = park.imgPath
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
    for (var i = 0; i < parks.length; i++) {
        if(parks[i].id == id) {
            return parks[i]
        }
    }
}

function test(id) {
    return new URLSearchParams(window.location.search).get(id)
}

document.addEventListener("DOMContentLoaded", () => {
    init();
})