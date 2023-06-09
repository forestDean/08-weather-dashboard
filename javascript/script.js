$(window).ready(function() { 
  // console.log("window ready"); 
  var searchHistory = JSON.parse(localStorage.getItem("search"));
  searchList();
 

    // Event listener for search-button
    $("#search-button").on("click", function(event) {
        event.preventDefault();

        var name = $("#search-input-city").val().trim().toLowerCase();
        // console.log("search-input-city: " + name);
        var country = $("#search-input-country").val().trim().toUpperCase();
        // console.log("search-input-country: " + country);

        // if empty Alert & return
        if(name == "" ) {
          alert();
          return;
        }

        var city = {
          city: name, 
          code: country
        };

        // bugFix
        if (searchHistory == null){
          searchHistory = [];
        }    
        searchHistory.push(city);
        localStorage.setItem("search",JSON.stringify(searchHistory));
        searchList();

      });
        

      // Search History button builder
      function searchList(name, country) {
          // clear searchList
          $('#list').empty();

          // build searchList from searchHistory
          if (searchHistory != null){
            for (var i = 0; i < searchHistory.length; i++) {
              // console.log("localStorage: " + searchHistory[i].city);
              // console.log("localStorage: " + searchHistory[i].code);

              var name = searchHistory[i].city;
              var country = searchHistory[i].code;;
              var a = $("<button>");
              // Adding the classes
              a.addClass("btn btn-lg btn-block btn-outline-light titlecase historyButton");
              // Adding a data-attribute with a value of the city
              a.attr("data-city", name);
              // Adding a data-attribute with a value of the country code
              a.attr("data-code", country);
              // Adding the button's text with a value of the city
              a.text(name);
              // Adding the button to the HTML
              $("#list").prepend(a);

              if (i == searchHistory.length-1) {
                cardBuild(name, country);
              }
            };
          } else {
          // default population: london, UK
              cardBuild("london", "UK");
          };

      };


      // display the weather for a stored location
      function displayWeather() {
          name = $(this).attr("data-city");
          country = $(this).attr("data-code");
          cardBuild(name, country);
      };


      function cardBuild(name, country){    
        // Build the query URL for the ajax request to the WeatherMap API
        var APIkey = "26355e49dde4c9bc9cc138c533cbc5f2"
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "," + country + "&appid=" + APIkey + "&units=imperial";

        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
          url: queryURL,
          method: "GET",
          // if no search match
          error: function() {
            searchHistory.pop();
            alert();
            searchList();
          }
        })
  
        // After the data from the AJAX request returns...
        .then(function(response) {
          
          // console.log(response);

          var city = response.city.name;
          console.log("city: " + city);          $("#cardCity").text(city);
          $("#cardCity").append("<small> " + country + "</small>")
          $("#cardCity").children().eq(0).addClass("countryID");

          // create weatherCards/button with a loop = 1 current + 5 future
          // iterate over JSON Object ...return Current then select midday results (3hr range) for 5 days
          var k = 0;
          var p = 0;  
          for (var i = 0; i < response.list.length; i++) {
            // console.log("i: " + i);

            var unix = response.list[i].dt;
            // adjust to timezone
            unix = unix + response.city.timezone;
            // console.log("unixTZ: " + unix);
            var date = new Date(unix * 1000);
            var unixHour = date.getHours();
            var options1 = { weekday: 'long' };
            var options2 = { year: 'numeric', month: 'long', day: 'numeric' };
            var unixDay = date.toLocaleDateString("en-GB",options1);
            var unixDate = date.toLocaleDateString("en-GB",options2);
                  //console.log(unixDay);   // Prints: Saturday
                  //console.log(unixDate);   // Prints: 6 May 2023
            unixHour = parseInt(unixHour);
                  //console.log("UnixHour: " + unixHour)

            if (i == 0 || unixHour >= 12 && unixHour <= 14){ 

              // if (unixHour >= 12 && unixHour <= 14){
              //   console.log("*********************************midday unixHour ");
              // };

              var icon = response.list[i].weather[0].icon;
              icon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
              // console.log("icon : " + icon );
              var description = response.list[i].weather[0].description;
              // console.log("description: " + description )
              var temp = response.list[i].main.temp; // imperial: Fahrenheit (32°F − 32) × 5/9 = 0°C
              temp = (temp-32)*(5/9);
              temp = temp.toFixed();
             // console.log("temp : " + temp + "°C"); 
              var wind = response.list[i].wind.speed; // imperial: miles/hour
              wind = wind.toFixed();
              // console.log("wind : " + wind + " miles/hour");
              var humd = response.list[i].main.humidity; 
              // console.log("humidity : " + humd + "%"); // units %
              
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

            // compensate if no midday returns on last day 
            if (k == 5 && i == response.list.length-1 && unixHour < 12) {
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

      function alert(){
        // alert
        $('#searchalert').removeClass('d-none');
        // delayed reset
        setTimeout(function() { 
        $('#searchalert').addClass('d-none');
        }, 2000);
      }

      // Adding a click event listener to all elements with a class of .historyButton
      $(document).on("click", ".historyButton", displayWeather);

      // Event listener for reset-button
      $("#reset").on("click", function(event) {
        //$("#search-button").on("click", function(event) {
        localStorage.clear();
        location.reload();
      });


}); // e/o onload