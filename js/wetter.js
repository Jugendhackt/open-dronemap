if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(function(pos) {
        $("#msg").html("Ihre Position: " + pos.coords.latitude + " " + pos.coords.longitude);
        console.log(pos);
        var lat = pos.coords.latitude
        var lng = pos.coords.longitude
        lat = Math.round(lat * 10000)/10000
        lng = Math.round(lng * 10000)/10000
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=f5a1b2e0d2a5694785c81addd5465159"
        })
        .done(function(data){
            var speed = data.wind.speed;
            $("#msg").html("Die Windwgeschwindigkeit bei dir beträgt: " + speed);
        })
    });
}
else{
    $("#msg").html(
        "Ihr Webbrowser unterstützt leider keine Geolocation. Deshalb kann das Wetter für sie nicht ortsspezifisch ermittelt werden."
    );
}