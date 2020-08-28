//The following will need to have coded
//things for sure need to be in a var
var location; //This is for current search
var history; //this is for past search
    function historySave(){
        history = JSON.parse(localStorage.getItem("userHistory"));
        if (history === null){
            history = [];
            localStorage.setItem("userHistory", JSON.stringify(history));
        } else{
            for( var i = 0; i<history.length; i++){
                $("#userHistory").append(`<li><a href="#!" class="histEl">${history[i]}</a></li>`);
            }
            location = history[0];
        }
    }
historySave();
    //This should have the ability to use the location of the search 
        //storage it as a keyword of search to go back to the city
        //use local storage to keep past searches
        //using JSON 

    //function for the submit button to save inputs
    //to collect the user input for later use if need be
    $("#submit").click(function(){
        if(document.getElementById("location").value == ""){
            alert("You must put in a city")
            //this lets the user know they must input a city 
        }else{
            location = document.getElementById("location").value
            $("#userHistory").prepend(`<li><a href="#!" class="histEl" value="${location}">${locaction}</a></li>`);
            history.unshift(location)
            localStorage.setItem("history", JSON.stringify(history));
            

        }
    })


    //a way to get the information from the data base for weather
        //one for current day
        //one for the next day 1
        //one for the next day 2
        //one for the next day 3
        //one for the next day 4
        //one for the next day 5

    
    //use the data from API to get following for each day
        //the type of weather i.e. rain, clouds, etc
        // the temp of weather
        //humidity levels
        // wind speed 
        //UV index that changes color base on level