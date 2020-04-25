// store the objects in the local storage if there are any city name inputs in there, if not return an empty array
var searchHistory = JSON.parse(localStorage.getItem("searches")) || [];
// display the last item from local storage if there is anything in it, else do nothing
if (searchHistory.length > 0) {
    getWeather(searchHistory[searchHistory.length-1]);
}


// upon enter button, run code
$('.search-container').on('submit', function(e){
    e.preventDefault()
    var cityName = $("#city-input").val().trim();
    if (cityName === "") {
        return false;
    } else {
        getWeather(cityName);
    };
    $("#city-input").val("");
})

// upon clicking search history, run code
// can't get the code to run if i make it listen for click event on the button with class previous-search so I am making it listen to a
// click event on the whole container and bubbling up the button. look up delegated event handlers or event-delegation approach for reference
$("#search-history").on("click", "button", function() {
    getWeather($(this).text());
    console.log($(this).text())
})

// function for dynamically appending DOM elements and calling a response from the API
function getWeather(cityName) {
    //make a search history appear under the form
    var list = $("<button>").text(cityName).addClass("list-group-item list-group-item-action previous-search");
    $("#search-history").append(list);

    // push the search into an array called searchHistory so that we can call on it later
    searchHistory.push(cityName);
    window.localStorage.setItem("searches", JSON.stringify(searchHistory));

    // clear out all the cards before creating new ones otherwise the cards start to stack weird
    $("#forecast-row").empty();

    // build html for the current weather and 5 day forecast
    for (var i = 0; i<5; i++) {
        var cardContainer = $("<div>").attr("class", "col-md-4 col-xl-2").attr("id", "card-container");
        var consecutiveDays = moment().add(i, 'days').format("MM/DD/YYYY");
        var forecastTemp = $("<p>").attr("id", `card-temperature${i}`);
        var forecastHumidity = $("<p>").attr("id", `card-humidity${i}`)
        var cardDiv = $("<div>").attr("class", "card bg-primary");
        var cardBody = $("<div>").attr("class", "card-body text-light");
        //append to display on html
        $("#forecast-row").append(cardContainer);
        cardContainer.append(cardDiv);
        cardDiv.append(cardBody);
        cardBody.append(`<p id='cardDate${i}'>${consecutiveDays}</p>`)
        cardBody.append(forecastTemp);
        cardBody.append(forecastHumidity);
    }

    // get the query url using the cityName variable, which refers to the user input
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=266481e2660501477ece5aaa3260a249`
    // use ajax method to request data from api
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // create a display for current city being searched
        var city = response.city.name;
        $(".city-display").text(`${city} (${moment().format("MM/DD/YYYY")})`);
        // create a display for the current icon
        var icon = response.list[0].weather[0].icon;
        var iconDisplay = $(`<img src='https://openweathermap.org/img/w/${icon}.png'>`);
        $(".city-display").append(iconDisplay);
        // create display for current temperature
        var temp = (Math.floor((response.list[0].main.temp - 273.15) * 1.8) + 32);
        $(".temp-display").text(`Current Temperature: ${temp}°F`);
        // create display for current humidity
        var humidity = response.list[0].main.humidity;
        $(".humidity-display").text(`Humidity: ${humidity}%`);
        // create display for current wind speed
        var wind = response.list[0].wind.speed;
        $(".wind-display").text(`Wind Speed: ${wind} MPH`);
        // below is the code for the forecast
        for( let i = 0; i< 5; i++){
        $(`#cardDate${i}`).append(`<img src='https://openweathermap.org/img/w/${response.list[i*8].weather[0].icon}.png'>`);
        $(`#card-temperature${i}`).text("Temp: " + (Math.floor((response.list[i*8].main.temp - 273.15) * 1.8) + 32) + "°F");
        $(`#card-humidity${i}`).text("Humidity: " + response.list[i*8].main.humidity + "%");
        }
    });
};
