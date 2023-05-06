$(window).ready(function() { console.log("window ready"); //});

//window.onload = function(){

// https://openweathermap.org/forecast5
// api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}

// Create a weather dashboard with form inputs.

// When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
//   When a user views the current weather conditions for that city they are presented with:
//     The city name
//     The date
//     An icon representation of weather conditions
//     The temperature
//     The humidity
//     The wind speed
//   When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
//     The date
//     An icon representation of weather conditions
//     The temperature
//     The humidity
//     The wind speed
// When a user click on a city in the search history they are again presented with current and future conditions for that city

// Use Moment.js to format the date
// function clock() {
//     var date = moment().format('dddd - Mo MMMM YYYY');
//     var time = moment().format('hh:mm:ss a');
//     $("#currentDate").text(date);

//     // Reset the Scheduler at midnight
//     var midnight = moment().format('H');
//     if (midnight === 0) {
//         reset();
//     }
// };
//var unixDay;
//var unixDate;
function unixConvert(unix) {
    //var unixTimestamp = 1683396000;
    var date = new Date(unix * 1000);
    var options1 = { weekday: 'long' };
    var options2 = { year: 'numeric', month: 'long', day: 'numeric' };

    console.log(date);
    //console.log(Date.now());
    var unixDay = date.toLocaleDateString("en-GB",options1);
    var unixDate = date.toLocaleDateString("en-GB",options2);
    console.log(unixDay);   // Prints: Saturday
    console.log(unixDate);   // Prints: 6 May 2023
}


    // Event listener for search-button
    $("#search-button").on("click", function(event) {
        event.preventDefault();

        var name = $("#search-input-city").val().trim().toLowerCase();
        console.log("search-input-city: " + name);
        var country = $("#search-input-country").val().trim().toUpperCase();
        console.log("search-input-country: " + country);


// IF EMPTY 
// return;

        // =========== localStorage: only the search query City/Country - display the City/Country =========== 

        var name; //check case sensitive >>propercase & trim #search-input-city
        var country; //check case sensitive >>uppercase & trim #search-input-country
        // Build the query URL for the ajax request to the WeatherMap API
        //var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=London,UK&appid=26355e49dde4c9bc9cc138c533cbc5f2";
        var APIkey = "26355e49dde4c9bc9cc138c533cbc5f2"
        //var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=London,UK&cnt=6&appid=" + APIkey + "&units=imperial";
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "," + country + "&cnt=6&appid=" + APIkey + "&units=imperial";

        

        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
  
        // After the data from the AJAX request comes back
          .then(function(response) {
            
            console.log("Hi");
            console.log(response);

            // create weatherCards/button with a loop = 1 current + 5 future
            var unix = response.list[0].dt;
            console.log("unix: " + unix);
            unixConvert(unix); 

            var city = response.city.name;
            console.log("city: " + city);
            var icon = response.list[0].weather[0].icon;
            console.log("icon : " + icon );
            console.log("https://openweathermap.org/img/wn/" + icon + "@2x.png");
            // https://openweathermap.org/img/wn/10d@2x.png
            var description = response.list[0].weather[0].description;
            console.log("description: " + description )
            var temp = response.list[0].main.temp; // imperial: Fahrenheit (32°F − 32) × 5/9 = 0°C
            temp = (temp-32)*(5/9);
            temp = temp.toFixed();
            console.log("temperature : " + temp + "°C"); 
            var wind = response.list[0].wind.speed; // imperial: miles/hour
            console.log("wind : " + wind + " miles/hour");
            var humd = response.list[0].main.humidity; 
            console.log("humidity : " + humd + "%"); // units %







  
        //     // Creating and storing an image tag
        //     var catImage = $("<img>");
  
        //     // Setting the catImage src attribute to imageUrl
        //     catImage.attr("src", imageUrl);
        //     catImage.attr("alt", "cat image");
  
        //     // Prepending the catImage to the images div
        //     $("#images").prepend(catImage);
          });
      });











// e/o onload
});