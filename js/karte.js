var map = L.map(document.getElementById("map"), {
    center: [52.5025, 13.4122],
    zoom: 13,
});
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
    foo: 'bar',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap-Mitwirkende</a>',
}).addTo(map);

function mark(color, coar, radius) {
    L.circle(coar, { radius: radius, color: color }).addTo(map);
}

function showNewCycles() {
    var bounds = map.getBounds();
    var coar = [bounds._southWest.lat, bounds._southWest.lng, bounds._northEast.lat, bounds._northEast.lng] //definiert screenposition
    var roundedcoar = coar.map(function (k) {
        return (Math.round(k * 10000) / 10000)
    });
    var url = "https://www.overpass-api.de/api/interpreter?data=[out:json];node(" + roundedcoar.join(",") + ")[%22amenity%22~%22police%22];out;"; //ruft elemente für bound-koordinaten auf
    console.log(url);
    $.ajax({
        url: url
    })
        .done(function (data) {
            console.log(data);
            data.elements.forEach(function (place) {
                mark('#FF0000', [place.lat, place.lon], 500);
            })
        })
        .fail(function (e, textstatus) {
            console.log(e);
            console.log(textstatus);
        });
}

map.on("zoomend", function () {
    showNewCycles();
});

map.on("moveend", function () {
    showNewCycles();
});

showNewCycles();