//var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=46e5338512b95557324915cc5f4b42af&units=imperial"

//click function for the input weather field
$(document).ready(function () {

    $("#search-button").on("click", function () {
        var search = $("#search-input").val();

        $("#search-input").val("");

        findWeather(search);
    });




    function findWeather(search) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=46e5338512b95557324915cc5f4b42af&units=imperial"

        $.ajax({
            url: queryURL,
            type: "GET",

        }).then(function (weatherData) {
            console.log(weatherData)

            console.log(weatherData.main.temp)
            console.log(weatherData.wind.speed)

            var cityName = $('<h2>').text(weatherData.name)
            var temp = $('<h4>').text('Current Temp: ' + weatherData.main.temp)
            var windSpeed = $('<h4>').text('Current wind speed: ' + weatherData.wind.speed)

            $("#today").append(cityName, temp, windSpeed)

            findForecast(search);

        })

    }

    function findForecast(search) {
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=46e5338512b95557324915cc5f4b42af&units=imperial"

        $.ajax({
            url: forecastURL,
            type: "GET"
        }).then(function (forecastData) {
            console.log(forecastData)
            var forecastArray = []
            for (var i = 0; i < forecastData.list.length; i++) {
                //console.log('single dude from array', forecastData.list[i].dt_txt.split(' ')[1])
                if (forecastData.list[i].dt_txt.split(' ')[1] === '00:00:00') {
                    //console.log('we found a 00:00:00 match', forecastData.list[i])
                    var forecastDate = $('<h5>').text('Date: ' + forecastArray.dt_txt)
                    var forecastTemp = $('<h5>').text('Temp: ' + forecastArray.main.temp)
                    var forecastHumidity = $('<h5>').text('Humidity: ' + forecastArray.main.humidity)

                    forecastArray.push(forecastData.list[i])
                    $("#forecast").append(forecastDate, forecastTemp, forecastHumidity)
                }
            }
            console.log('5 day forcast array to append!!!', forecastArray);

        })
    }




})





// Step 1: click function for input field 
// step 2: history function for the input box
// step 3: ajax calls and cards for the result of input field