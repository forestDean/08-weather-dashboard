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
// var unixHour;
// function unixConvert(unix) {
//   // console.log(typeof unix);
//   // console.log(jQuery.type(unix));
//   //var unixNew = new Date(unix * 1000);
//   // console.log("unixNew: " + typeof unixNew);
//   // console.log("unixNew: " + jQuery.type(unixNew))
//   // console.log("unixNew: " + unixNew);
//   // var unixNewHours = unixNew.getHours();
//   // console.log("unixNewHours: " + unixNewHours);
//   // console.log(typeof unixNewHours);
//   // console.log(jQuery.type(unixNewHours));

//     //var unixTimestamp = 1683396000;
//     var date = new Date(unix * 1000);
//     var options1 = { weekday: 'long' };
//     var options2 = { year: 'numeric', month: 'long', day: 'numeric' };
//     //var options3 = { hour: 'numeric' };

//     console.log(date);
//     //console.log(Date.now());
//     var unixDay = date.toLocaleDateString("en-GB",options1);
//     var unixDate = date.toLocaleDateString("en-GB",options2);
//     var unixHour = date.getHours();
//     console.log("unixHour: " + unixHour);
//     console.log("*********************1**" + typeof unixHour);
//     console.log("*********************1**" + jQuery.type(unixHour));

//     //var unixHour = new Date(unix * 1000);
//     //var unixHour = date.toLocaleTimeString("en-GB",options3);
//     //unixHour = parseInt(unixHour);
//     //unixHour = JSONparse(unixHour);
//     //unixHour = number(unixHour);
//     console.log(unixDay);   // Prints: Saturday
//     console.log(unixDate);   // Prints: 6 May 2023
//     console.log("unixHour: " + unixHour);
//     //return unixHour;
// }


    // Event listener for search-button
    $("#search-button").on("click", function(event) {
        event.preventDefault();

        var name = $("#search-input-city").val().trim().toLowerCase();
        console.log("search-input-city: " + name);
        var country = $("#search-input-country").val().trim().toUpperCase();
        console.log("search-input-country: " + country);

        // =========== localStorage: only the search query City/Country - display the City/Country =========== 
        // set max History
        // add clear History
        // default population: Bristol, UK

        var name; //check case sensitive >>propercase & trim #search-input-city
        var country; //check case sensitive >>uppercase & trim #search-input-country
        // Build the query URL for the ajax request to the WeatherMap API
        var APIkey = "26355e49dde4c9bc9cc138c533cbc5f2"
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "," + country + "&appid=" + APIkey + "&units=imperial";

        

        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
          url: queryURL,
          method: "GET",
          // if empty or no search match
          error: function() {
            // alert
            console.log("search not found");
            $('#searchalert').removeClass('d-none');
            // delayed reset
            setTimeout(function() { 
            $('#searchalert').addClass('d-none');
            }, 3000);
          }
        })
  
        // After the data from the AJAX request returns...
          .then(function(response) {
            
            console.log("Hi");
            console.log(response);

            var city = response.city.name;
            console.log("city: " + city);
            $("#cardCity").text(city);
            // create weatherCards/button with a loop = 1 current + 5 future
            //var i = 0;
            //iterate over JSON Object ...return Current then select Noon results (3hr range) for 5 days
            //$(".card").each(function(){ //CHANGE THIS !!!
            for (var i = 0; i < response.list.length; i++) {
              console.log("i: " + i);

              var unix = response.list[i].dt;
              console.log("unix: " + unix);
              // unixConvert(unix); // returns unixDay/unixDate
              //console.log(typeof unixHour);
              //console.log(jQuery.type(unixHour));
              var date = new Date(unix * 1000);
              var unixHour = date.getHours();
              var options1 = { weekday: 'long' };
              var options2 = { year: 'numeric', month: 'long', day: 'numeric' };
              var unixDay = date.toLocaleDateString("en-GB",options1);
              var unixDate = date.toLocaleDateString("en-GB",options2);

                    console.log(unixDay);   // Prints: Saturday
                    console.log(unixDate);   // Prints: 6 May 2023

                    console.log("UnixHour: " + unixHour) // returns "undefined"
              unixHour = parseInt(unixHour);
                    console.log("UnixHour: " + unixHour) // returns 
                    console.log("*********************2**" + typeof unixHour);
                    console.log("*********************2**" + jQuery.type(unixHour));

              if (i == 0){ //}; //build Current weatherCard
              if (unixHour >= 12 && unixHour <= 14){
                
                console.log("*****************midday unixHour ");
              };


              var icon = response.list[i].weather[0].icon;
              icon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
              console.log("icon : " + icon );
              //console.log("https://openweathermap.org/img/wn/" + icon + "@2x.png");
              // https://openweathermap.org/img/wn/10d@2x.png
              // switch with Google icons
              var description = response.list[i].weather[0].description;
              console.log("description: " + description )
              var temp = response.list[i].main.temp; // imperial: Fahrenheit (32°F − 32) × 5/9 = 0°C
              temp = (temp-32)*(5/9);
              temp = temp.toFixed();
              console.log("temperature : " + temp + "°C"); 
              var wind = response.list[i].wind.speed; // imperial: miles/hour
              console.log("wind : " + wind + " miles/hour");
              var humd = response.list[i].main.humidity; 
              console.log("humidity : " + humd + "%"); // units %
              i++;

              // build weatherCard
              $("#cardDay").text(unixDay);
              $("#cardDate").text(unixDate);
              //$("#cardIcon").prepend("<small>" + description + " </small>");
              $("#cardIconImg").attr("src", icon);
              $("#cardTemp").text("temperature: " + temp + "°C");
              $("#cardWind").text("wind: " + wind + " mph");
              $("#cardHumd").text("humidity: " + humd + "%");
              
            };

           };





  
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