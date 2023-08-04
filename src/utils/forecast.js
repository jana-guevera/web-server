const request = require("postman-request");

const getWeather = (location, callback) => {
    const weatherURL = "http://api.weatherstack.com/current?access_key=c213a3f770ad2aa9bfd2492a8b26a5ff&query=" + location;

    request({url: weatherURL, json:true}, (error, response) => {
        if(error){
            const errorMsg = "Unable to connect to the server. Please check your internet connection.";
            callback(errorMsg, undefined);
        }else if(response.body.error){
            const errorMsg = "Unable to find weather, please try another location!";
            callback(errorMsg, undefined);
        }else{
            callback(undefined, "The weather is " + response.body.current.temperature + " degree.");
        }
    });
}

module.exports = getWeather;