const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const weatherURL = "http://api.weatherstack.com/current?access_key=a0209f40212e543fba07c6a36b8ff39f&query=" 
                        + latitude + "," + longitude;

    request({url: weatherURL, json: true}, (error, response) => {
        if(error){
            callback("No internet connection!", undefined);
        }else if(response.body.error){
            callback("Location not found, please try another location!", undefined);
        }else{
            const body = response.body;
            const report = "Its currently " + body.current.temperature + 
            " degrees. But it feels like " + body.current.feelslike + " degrees.";

            callback(undefined, report);
        }
    });
}

module.exports = forecast;

