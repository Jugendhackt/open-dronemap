var map = L.map(document.getElementById("map"), {   // Erstelle Karte
    center: [52.5025, 13.4122],     // Karte zentriert auf Betahaus Berlin
    zoom: 13,
    maxZoom: 16,
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {    // Definiere Tiles (OSM)
    foo: 'bar',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap-Mitwirkende</a>',  // OSM Copyright Hinweis
}).addTo(map);

function mark(color, coar, radius) {        // function, um Gebäude mit Kreis zu markieren
    L.circle(coar, { radius: radius, color: color }).addTo(map);    // Erstelle Kreis
}

function showNewCycles() {          // Suche Gebäude
    map.eachLayer(function(l){ if (l.options && l.options.color && l.options.color === "#FF0000") {map.removeLayer(l)}})
    var bounds = map.getBounds();   // bounds = Eckpunkte der Karte
    var coar = [bounds._southWest.lat, bounds._southWest.lng, bounds._northEast.lat, bounds._northEast.lng] // Definiert screenposition
    var roundedcoar = coar.map(function (k) {   // Runde Eckkoordinaten auf 4 nachkommastellen
        return (Math.round(k * 10000) / 10000)
    });
    var url = "https://www.overpass-api.de/api/interpreter?data=[out:json];node(" + roundedcoar.join(",") + ")[%22amenity%22~%22police|hospital|prison%22];out;"; // Erstelle URL für Ajax
    console.log(url);
    $.ajax({
        url: url
    })
        .done(function (data) {
            console.log(data);
            data.elements.forEach(function (place) {    // Jeder einzelne Gebäude
                mark('#FF0000', [place.lat, place.lon], 100);   // Erstelle Kreis mit function mark
            })
        })
        .fail(function (e, textstatus) {
            console.log(e);
            console.log(textstatus);
        });
        var url = "https://www.overpass-api.de/api/interpreter?data=[out:json];node(" + roundedcoar.join(",") + ")[%22landuse%22~%22military|industrial%22];out;"; //ruft elemente für bound-koordinaten auf
        console.log(url);
        $.ajax({
            url: url
        })
            .done(function (data) {
                console.log(data);
                data.elements.forEach(function (place) {
                    mark('#FF0000', [place.lat, place.lon], 100);
                })
            })
            .fail(function (e, textstatus) {
                console.log(e);
                console.log(textstatus);
            });
            var url = "https://www.overpass-api.de/api/interpreter?data=[out:json];node(" + roundedcoar.join(",") + ")[%22aeroway%22~%22aerodrome|apron|hangar|helipad|heliport|beacon%22];out;"; //ruft elemente für bound-koordinaten auf
            console.log(url);
            $.ajax({
                url: url
            })
                .done(function (data) {
                    console.log(data);
                    data.elements.forEach(function (place) {
                        mark('#FF0000', [place.lat, place.lon], 1500);
                    })
                })
                .fail(function (e, textstatus) {
                    console.log(e);
                    console.log(textstatus);
                });
}

map.on("zoomend", function () { // Aktualisiere markierte Gebäude bei Zoomen 
    showNewCycles();
});

map.on("moveend", function () { // Aktualisiere markierte Gebäude bei Verschieben
    showNewCycles();
});

showNewCycles();
