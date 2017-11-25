var map = L.map(document.getElementById("map"), {
    center: [52.5025, 13.4122],
    zoom: 13,
});
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
L.circle([52.5025, 13.4122], {radius: 500, color: "#ffffff"}).addTo(map);