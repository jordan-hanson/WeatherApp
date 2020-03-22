//var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=46e5338512b95557324915cc5f4b42af&units=imperial"
// var storageSearch = localStorage.getItem("#search-input")
// console.log("this is my  storage ", storageSearch)
//click function for the input weather field

$(document).ready(function () {
    function renderSearchInput() {
        var cityHistory = localStorage.getItem("#search-input")

        if (cityHistory === null) {
            return;
        }
    }
    $(".history").on("click", "li", function () {
        cityHistory($(this).text());
    });

    $("#search-button").on("click", function () {
        var search = $("#search-input").val();

        $("#search-input").val("");

        localStorage.setItem("history", search)
        // document.getElementById("#history").innerHTML = localStorage.getItem("#search-input")
        console.log('this is the history', localStorage.getItem("history"))
        var li = $('<li>').addClass("pastSearch list-group-item list-group-item-action").text(localStorage.getItem("history"))
        $(".history").append(li)
        renderSearchInput();
        findWeather(search);
    });

    $(document).on("click", ".pastSearch", function () {
        console.log("you got clicked")
        findWeather(search);
    })



    function findWeather(search) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=46e5338512b95557324915cc5f4b42af&units=imperial"

        $.ajax({
            url: queryURL,
            type: "GET",

        }).then(function (weatherData) {
            console.log(weatherData)

            console.log(weatherData.main.temp)
            console.log(weatherData.wind.speed)

            $("#today").empty()

            var cityName = $('<h2>').text(weatherData.name)
            var temp = $('<h4>').text('Current Temp: ' + weatherData.main.temp + ' F')
            var windSpeed = $('<h4>').text('Current wind speed: ' + weatherData.wind.speed + ' MPH')

            var icon = $('<img>').attr('src', "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png")
            $("#today").append(cityName, temp, windSpeed, icon)

            findForecast(search);
            getUVIndex(search.coord.lat, search.coord.lon);
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
            $("#forecast").empty();
            for (var i = 0; i < forecastData.list.length; i++) {
                //console.log('single dude from array', forecastData.list[i].dt_txt.split(' ')[1])
                if (forecastData.list[i].dt_txt.split(' ')[1] === '00:00:00') {
                    //console.log('we found a 00:00:00 match', forecastData.list[i])
                    var container = $('<div>').addClass("inline")
                    var forecastDate = $('<h5>').addClass("list-group-item").text('Date: ' + forecastData.list[i].dt_txt.split(' ')[0])
                    var forecastTemp = $('<h5>').addClass("list-group-item").text('Temp: ' + forecastData.list[i].main.temp + ' F')
                    var forecastHumidity = $('<h5>').addClass("list-group-item").text('Humidity: ' + forecastData.list[i].main.humidity + ' %')

                    forecastArray.push(forecastData.list[i])
                    container.append(forecastDate, forecastTemp, forecastHumidity)
                    $("#forecast").append(container)
                }
            }
            console.log('5 day forcast array to append!!!', forecastArray);

        })
    }
    function getUVIndex(lat, lon) {
        var UVLocationURL = "http://api.openweathermap.org/data/2.5/uvi?appid=46e5338512b95557324915cc5f4b42af&lat=" + lat + "&lon" + lon

        $.ajax({
            url: UVLocationURL,
            type: "GET"
        }).then(function (search) {
            var uv = $("<p>").text("UV Index: ");
            var UvBtn = $("<span>").addClass("btn btn-sm").text(search.value);
            console.log("this is uv", search)
            if (search.value < 3) {
                UvBtn.addClass("btn-success");
            }
            else if (search.value < 7) {
                UvBtn.addClass("btn-warning");
            }
            else {
                UvBtn.addClass("btn-danger");
            }

            $("#today").append(uv.append(btn));

        })
    }

    function geoFindMe() {

        const status = document.querySelector('#location');
        const mapLink = document.querySelector('#long-latlink');

        mapLink.href = '';
        mapLink.textContent = '';

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            status.textContent = '';
            mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        }

        function error() {
            status.textContent = 'Unable to retrieve your location';
        }

        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        } else {
            status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(success, error);
        }

    }

    document.querySelector('#search-input').addEventListener('click', geoFindMe);

    // let crd = pos.coords;
    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
    // let lon = crd.longitude;
    // let lat = crd.latitude;
    // queryURL = buildQueryUrl(lat, lon);
    // console.log(queryURL)




})





// Step 1: click function for input field 
// step 2: history function for the input box
// step 3: ajax calls and cards for the result of input field