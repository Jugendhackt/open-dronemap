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

function showNewCycles(coar) {
    //[ [52.541806665759616,13.549575805664064] [3,4] ]
    var url = "https://www.overpass-api.de/api/interpreter?data=[out:json];area[%22boundary%22~%22administrative%22][%22name%22~%22Berlin%22];node(area)[%22amenity%22~%22police%22];out;";
    console.log(url);
    $.ajax({
        url: url
    })
        .done(function (data) {
            console.log(data);
            data.elements.forEach(function(place) {
                mark('#0000FF',[place.lat,place.lon],500);
            })
        })
        .fail(function(e,textstatus) {
            console.log(e);
            console.log(textstatus);
        });
}

map.on("zoomend", function() {
    a = map.getBounds();
    /*showNewCycles();*/
});