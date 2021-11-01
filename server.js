const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const { mainModule } = require("process")

const app = express()

const PORT = process.env.PORT || 5000

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
}) 

app.post("/", (req, res) => {
    const city = req.body.city 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f0eed54153a6f95424d15af57cfcd3bf`


    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data)
            res.render("result", {
                city: city,
                temp: weatherData.main.temp,
                tempMin: weatherData.main.temp_min,
                tempMax: weatherData.main.temp_max,
                weatherDes: weatherData.weather[0].description,
                windSpeed: weatherData.wind.speed,
                humidity: weatherData.main.humidity
            })
        })
    })
})



app.listen(PORT, () => {
    console.log("server is running up");
})