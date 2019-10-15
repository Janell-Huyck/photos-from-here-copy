navigator.geolocation.getCurrentPosition(function(position) {
    //when allowed, assign position based off actual location
    userPosition = {
        lattitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
}, function() {
    //if the user declines to allow the site to know location, set default location to Tokyo, Japan.
    userPosition = {
        lattitude: 35.6762,
        longitude: 139.6503
    }
})

