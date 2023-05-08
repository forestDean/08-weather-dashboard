$(window).ready(function() { 
  console.log("window ready"); 
 

    // build searchList from searchHistory
    var searchHistory = JSON.parse(localStorage.getItem("search"));
    // console.log("localStorage: " + searchHistory); // object
    if (searchHistory != null){
      for (var i = 0; i < searchHistory.length; i++) {
        console.log("localStorage: " + searchHistory[i].city);
        console.log("localStorage: " + searchHistory[i].code);
        var name = searchHistory[i].city;
        var country = searchHistory[i].code;
        console.log(name);
        console.log(country);
        searchList(name, country);
      if (i == searchHistory.length-1) {
        console.log("CARDBUILD");
        cardBuild(name, country);
      }


      };
    } else {
    // default population: london, UK
        cardBuild("london", "UK");
    };



     //  var searchHistory = [];
    // Event listener for search-button
    $("#search-button").on("click", function(event) {
        event.preventDefault();

        var name = $("#search-input-city").val().trim().toLowerCase();
        console.log("search-input-city: " + name);
        var country = $("#search-input-country").val().trim().toUpperCase();
        console.log("search-input-country: " + country);

        var city = {
          city: name, 
          code: country
        };

        if (searchHistory == null){
          searchHistory = [];
        } else if (searchHistory.length > 7){
        // remove first object - limit Searh History to 8 locations
        searchHistory.shift();
        }
        
        searchHistory.push(city);
        localStorage.setItem("search",JSON.stringify(searchHistory));

        searchList(name, country);
        cardBuild(name, country);

      });
        
      function searchList(name, country) {

        $("#list").prepend('<button class="btn btn-lg btn-block btn-outline-light titlecase" id="search-button" type="button" data-city=' + name + ' data-code=' + country + '>' + name + '</button>');

      };

      function cardBuild(name, country){

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
                  // console.log("*********************2**" + typeof unixHour);
                  // console.log("*********************2**" + jQuery.type(unixHour));

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
              console.log("temp : " + temp + "°C"); 
              var wind = response.list[i].wind.speed; // imperial: miles/hour
              wind = wind.toFixed();
              console.log("wind : " + wind + " miles/hour");
              var humd = response.list[i].main.humidity; 
              console.log("humidity : " + humd + "%"); // units %
              

              // build weatherCard
              $("#day0" + k).children().children().eq(1+p).text(unixDay);
              $("#day0" + k).children().children().eq(2+p).text(unixDate);;
              $("#day0" + k).children().children().eq(3+p).children().attr("src", icon);
              $("#day0" + k).children().children().eq(4+p).text("temp: " + temp + "°C");
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
              $("#day0" + k).children().children().eq(4+p).text("temp: " + temp + "°C");
              $("#day0" + k).children().children().eq(5+p).text("wind: " + wind + " mph");
              $("#day0" + k).children().children().eq(6+p).text("humidity: " + humd + "%");
            };
          };
        });
    
      };  //e/o cardBuild

}); // e/o onload