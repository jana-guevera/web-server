const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");

const server = express();

const staticPath = path.join(__dirname, "../public");
server.use(express.static(staticPath));

const partialsPath = path.join(__dirname, "../views/partials");
hbs.registerPartials(partialsPath);

server.set("view engine", "hbs");

server.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App", 
        author: "Beyond Training"
    });
});

server.get("/about", (req, res) => {
    res.render("about", {
        title: "About Us", 
        author: "Beyond Training"
    });
});

server.get("/help", (req, res) => {
    res.render("help", {
        title: "Help", 
        author: "Beyond Training"
    });
});

server.get("/weather", (req, res) => {
    
    if(req.query.location){
        geocode(req.query.location, (error, response) => {
            if(error){
                return res.send({
                    error: error
                });
            }

            forecast(response.latitude, response.longitude, (error, data) => {
                if(error){
                    return res.send({
                        error: error
                    });
                }

                res.send({
                    forecast: data,
                    location: response.location
                });
            });
        });
    }else{
        res.send({
            error: "Please provide the location!"
        });
    }
});

server.get("*", (req, res) => {
    res.render("404", {
        title: "404 Page not found!", 
        author: "Beyond Training"
    });
});


var port = 3000;

if(process.env.PORT){
    port = process.env.PORT
}


server.listen(port);

