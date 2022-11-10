const express = require("express");

const app = express();
const port = 3000;

const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    console.log(req.body.cityName);;

    console.log("Post request received.");

    const query = req.body.cityName;
    const apiKey = "secret:)";
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            // console.log(weatherData);
            // console.log(temp);
            // console.log(description);

            res.write("<p>The weather in " + query + " is currently " + description + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees in Celcius.</h1>");

            res.send();
        });
    });

    // res.send("Server works.");
});


app.listen(port, () => {
    console.log(`Server is running on ${port}.`);
});