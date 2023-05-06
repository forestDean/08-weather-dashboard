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




    // Event listener for search-button
    $("#search-button").on("click", function(event) {
        event.preventDefault();
        // get Date
        
        // localStorage: only the search query City/Country - display the City/Country
        var searchCity; //check case sensitive >>propercase & trim #search-input-city
        var searchCountry; //check case sensitive >>uppercase & trim #search-input-country
        // Build the query URL for the ajax request to the WeatherMap API
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=London,UK&appid=26355e49dde4c9bc9cc138c533cbc5f2";
        

        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
  
        // After the data from the AJAX request comes back
          .then(function(response) {
            
            console.log("Hi");
            console.log(response);
        //   // Saving the image_original_url property
        //     var imageUrl = response.data.images.original.url;
  
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