const express = require("express");
const path = require("path");
const hbs = require("hbs");

const forecast = require("./utils/forecast.js");

const server = express();

const staticFilePath = path.join(__dirname, "../public");
server.use(express.static(staticFilePath));

const partialsPath = path.join(__dirname, "../views/partials");
hbs.registerPartials(partialsPath);

server.set("view engine", "hbs");

server.get("/", (req, res) => {

    res.render("index",{
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
        forecast(req.query.location, (error, response) => {
            if(error){
                res.send({error: error});
            }else{
                res.send({
                    forecast: response
                });
            } 
        });
    }else{
        res.send({
            error: "Please provide the location!!"
        });
    }
});

server.get("*", (req, res) => {
    res.render("404", {
        title: "Page not found", 
        author: "Beyond Training"
    });
});

server.listen(3000);
