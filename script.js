//The following will need to have coded
//things for sure need to be in a var
//shorten history to shorten the code line

var place;
var hist;



// render events to page or create storage for events if no event array exists
function historySave(){
    hist = JSON.parse(localStorage.getItem("hist"));
    if( hist === null){
        hist = [];
        localStorage.setItem("hist", JSON.stringify(hist));
    } else { 
        for( var i = 0; i < hist.length; i++){
            $("#history").append(`<li><a href="#!" class="histEl">${hist[i]}</a></li>`);
        }
        
        place = hist[0];
        //this is for current weather
        currentWeather();
        //5 day forcast
        forcastWeather();
    };
};
historySave();
    //This should have the ability to use the place of the search 
        //storage it as a keyword of search to go back to the city
        //use local storage to keep past searches
        //using JSON 



//function for the submit button to save inputs
    //to collect the user input for later use if need be
$("#submit").click(function(){
    if(document.getElementById("place").value == ""){
        alert("You must put in a city")
            //this lets the user know they must input a city
    } else{
        place = document.getElementById("place").value;
        $("#history").prepend(`<li><a href="#!" class="histEl" value="${place}">${place}</a></li>`);
        hist.unshift(place);
        localStorage.setItem("hist", JSON.stringify(hist));
        currentWeather();
        forcastWeather();
    };
});
//to set the history call back logs of past search to reuse them
$(document).on('click', '.histEl', function(){
    place = event.toElement.text
      //this is the calling of the function for the five days 
        //when using the history log
    currentWeather();
    forcastWeather();
});

function forcastWeather(){
    //use the data from API to get following for each day
        //the type of weather i.e. rain, clouds, etc
        // the temp of weather
        //humidity levels
        
    
    $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=291682cad313f2e14dab4f91c45d3f25`,
            method: "GET"
        }).then(function(response) {
            var fiveDayItems = [3, 11, 19, 27, 35]
            for(var i = 0; i < fiveDayItems.length; i++){
                var date = response.list[fiveDayItems[i]].dt_txt.slice(0, 10).split("-")
                var icon = `https://openweathermap.org/img/wn/${response.list[fiveDayItems[i]].weather[0].icon}@2x.png`
                var temp = ((response.list[fiveDayItems[i]].main.temp - 273.15) * 9/5 + 32).toFixed(2)
                var humidity = response.list[fiveDayItems[i]].main.humidity
                // to clear errors and to ensure the div tags are empty to fill in data with
                $("#day"+(i+1)).empty()
                $("#day"+(i+1)).append(`
                <div class="card center purple darken-1">
                    <div class="card-content white-text">
                    <p class="nudge">${date[1]+"/"+date[2]+"/"+date[0]}</p>
                    <img src="${icon}" class="move" alt="weather icon">
                    <p>Temp ${temp}f</p>
                    <p>Humidity ${humidity}</p>
                    </div>
                </div>
                `)
            }
    });
}
// current day weather
//a way to get the information from the data base for weather:check
function currentWeather(){
    // api call for current weather with user place
        //this pulls the main weather parts of the api and data uses:check
    $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=291682cad313f2e14dab4f91c45d3f25`,
            method: "GET"
        }).then(function(response) {
            var lat = response.coord.lat
            var lon = response.coord.lon
            var uvi = ""
            var temp = ((response.main.temp - 273.15) * 9/5 + 32).toFixed(2)
            var icon = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
            var humidity = response.main.humidity
            var wind = response.wind.speed
            // current weather gives lat/lon for uvi call to get date and uvi
            $.ajax({
                //this gets the location of city base on latitude and longitude of the data base
                url: `https://api.openweathermap.org/data/2.5/uvi?appid=291682cad313f2e14dab4f91c45d3f25&lat=${lat}&lon=${lon}`,
                method: "GET"
                }).then(function(response) {
                     //one for current day: check
                        //the type of weather i.e. rain, clouds, etc
                        // the temp of weather
                        //humidity levels
                        // wind speed 
                        //UV index that changes color base on level
                    var date = response.date_iso.slice(0, 10).split("-")
                    uvi = response.value
                    // empties then adds current weather based on origin of function run
                    $("#current-weather").empty();
                    $("#current-weather").append(`
                    <div class="container">
                        <div class="row">
                            <div class="col s12">
                                <div class="card purple lighten-2">
                                    <div class="card-content white-text">
                                        <span class="card-title">
                                            <h5 id="city">${place}</h5>
                                            <h6 id="Date">${date[1]+"/"+date[2]+"/"+date[0]}</h6>
                                        </span>
                                        <img class="right" src="${icon}" alt="weather icon">
                                        <h5>Temp = ${temp}f</h5>
                                        <h5>Humidity = ${humidity}</h5>
                                        <h5>Wind Speed = ${wind} mph</h5>
                                        <h5>UV index = <span id="uvi">${uvi}</span></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`)
                   //color changes of UV with using the css documentation and page
                    if(uvi > 6){
                        $("#uvi").addClass("red")
                    }else if(uvi < 4){
                        $("#uvi").addClass("green")
                    }else{
                        $("#uvi").addClass("orange")
                    }
            });
    });
};


     

   
    
    
      


    
    