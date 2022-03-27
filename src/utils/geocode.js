const request = require("postman-request");

const getGeocode = (location, callback) => { 
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?limit=1&access_token=pk.eyJ1IjoiamFuYWd1ZXZlcmEwNyIsImEiOiJja3F2YW91aGQwY250MnFvNnlmYWIxZ3drIn0.kEuq4uPgYr0FnBlNDv7pPw";
    
    request({url: geocodeUrl, json: true}, (error, response) => {
        if(error){
            callback("No internet connection!", undefined);
        }else if(response.body.features.length === 0){
            callback("Location not found. Please try another location!", undefined);
        }else{
            const body = response.body;

            const geocode = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }

            callback(undefined, geocode);
        }
    })
}

module.exports = getGeocode;