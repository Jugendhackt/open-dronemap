if (navigator.geolocation) { 
    var coords = navigator.geolocation.getCurrentPosition();
    $("#location").html(coords)
}
else{
    $("#msg").html(
        "Ihr Webbrowser unterstützt leider keine Geolocation. Deshalb kann das Wetter für sie nicht ortsspezifisch ermittelt werden."
    )
}