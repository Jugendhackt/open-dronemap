if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(function(pos) {
        $("#msg").html(pos.coords.latitude + " " + pos.coords.longitude)
    });
}
else{
    $("#msg").html(
        "Ihr Webbrowser unterstützt leider keine Geolocation. Deshalb kann das Wetter für sie nicht ortsspezifisch ermittelt werden."
    )
}