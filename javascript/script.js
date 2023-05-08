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
          $("#cardCity").append("<small> " + country + "</small>")
          $("#cardCity").children().eq(0).addClass("countryID");

          // create weatherCards/button with a loop = 1 current + 5 future
          // iterate over JSON Object ...return Current then select midday results (3hr range) for 5 days
          var k = 0;
          var p = 0;  
          for (var i = 0; i < response.list.length; i++) {
            console.log("i: " + i);

            var unix = response.list[i].dt;
            console.log("unix: " + unix);
            var date = new Date(unix * 1000);
            var unixHour = date.getHours();
            var options1 = { weekday: 'long' };
            var options2 = { year: 'numeric', month: 'long', day: 'numeric' };
            var unixDay = date.toLocaleDateString("en-GB",options1);
            var unixDate = date.toLocaleDateString("en-GB",options2);

                  console.log(unixDay);   // Prints: Saturday
                  console.log(unixDate);   // Prints: 6 May 2023

                  console.log("UnixHour: " + unixHour)
            unixHour = parseInt(unixHour);
                  console.log("UnixHour: " + unixHour)
                  console.log("*********************2**" + typeof unixHour);
                  console.log("*********************2**" + jQuery.type(unixHour));

            if (i == 0 || unixHour >= 12 && unixHour <= 14){ 

              if (unixHour >= 12 && unixHour <= 14){
                console.log("*********************************midday unixHour ");
              };

              //var k = 0;  
              var icon = response.list[i].weather[0].icon;
              icon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
              console.log("icon : " + icon );
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
              

              // build weatherCard
              $("#day0" + k).children().children().eq(1+p).text(unixDay);
              $("#day0" + k).children().children().eq(2+p).text(unixDate);;
              $("#day0" + k).children().children().eq(3+p).children().attr("src", icon);
              $("#day0" + k).children().children().eq(4+p).text("temperature: " + temp + "°C");
              $("#day0" + k).children().children().eq(5+p).text("wind: " + wind + " mph");
              $("#day0" + k).children().children().eq(6+p).text("humidity: " + humd + "%");
            
              // adjust for City child only in Current weatherCard
              if (k == 0) {
                p--;
              };

              k++;
              console.log("k : " + k);
          };

            // compensate for no midday returns on last day 
            if (k == 5 && i == response.list.length-1 && unixHour < 12) {
              console.log("LAST CARD: " + i);
              $("#day0" + k).children().children().eq(1+p).text(unixDay);
              $("#day0" + k).children().children().eq(2+p).text(unixDate);
              $("#day0" + k).children().children().eq(3+p).children().attr("src", icon);
              $("#day0" + k).children().children().eq(4+p).text("temperature: " + temp + "°C");
              $("#day0" + k).children().children().eq(5+p).text("wind: " + wind + " mph");
              $("#day0" + k).children().children().eq(6+p).text("humidity: " + humd + "%");
            };



          };
        });
    });











// e/o onload
});