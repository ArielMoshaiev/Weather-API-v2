//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const path = require("path");
const ejs = require("ejs");
const { Script } = require("vm");
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

function WeatherRequest(req,res,choosencity)
{
  
  const api = process.env.API_K;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + choosencity + "&units=metric&appid=" + api;
  axios.get(url)
    .then(response => {
      const data = response.data;
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
        //making GET request to the API and stores the data inside variables 
      
      res.render("home", {
        city: name,
        icon: src = "https://openweathermap.org/img/wn/" + icon + ".png",
        description: description,
        temperature: temp,
        humidity: humidity,
        windSpeed: speed,
        //render the home page with the stored data 
      });
    })
    .catch(error => {
      // Handle the error 
      console.error(error);
      res.render("error");

    });
}
app.get("/home", function (req, res) {
   WeatherRequest(req,res,"jerusalem");
   //making GET REQ function with req of Jerusalem city
});

app.post("/home", function (req, res) {
  const choosencity = req.body.city;
  if(!choosencity){
    res.send("<script> alert('Please enter a city.'); window.location.href='/home';</script>");
    return;
    //if by accident the user search blunck field will driected to the home page
  }

  WeatherRequest(req,res,choosencity);
    //runs the function with the user chosen city
});
app.listen(3000, function () {
  console.log("Server started on port 3000");
});