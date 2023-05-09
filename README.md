# 08-weather-dashboard
Use the **Weather Dashboard** to retrieve weather data for cities around the world.

## Description
	
**jQuery**, **AJAX** and **Bootstrap** has been used to create a [Weather Dashboard](https://forestdean.github.io/08-weather-dashboard/) that interrogates the [OpenWeather API](https://openweathermap.org/forecast5) .  

When a user searches for a city they are presented with:
* the city name
* the date
* an icon representation of weather conditions
* temperature
* wind speed
* humidity
* a 5-day forecast

The searches are saved to localStorage and displayed in a `Search History` list.   
The data persists between refreshes of a page and searches can be recalled by clicking the corresponding button.   
To avoid search location confusion, an option to enter a *country code* is available.    
The `Search History` can be `Reset`.


The **Weather Dashboard** has been optimised for various display sizes using Bootstrap and responsive CSS design.  

	
## Installation
	
The page is live at https://forestdean.github.io/08-weather-dashboard/


	
## Usage
	   
This animation illustrates the usage of the **Work Day Scheduler**:     

![weather-dashboard](./images/weather-dashboard.gif)
	
## Credits
	
Date Object - https://www.w3schools.com/jsref/jsref_obj_date.asp   
Date.toLocaleDateString() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString    
Bootstrap input CSS - https://stackoverflow.com/questions/61083813/how-to-avoid-internal-autofill-selected-style-to-be-applied   
Timezone conversion - https://stackoverflow.com/questions/60627245/openweather-api-time-always-in-my-local-time-zone    
AJAX redirect when page not found - https://stackoverflow.com/questions/18944440/jquery-redirect-inside-ajax-in-case-page-not-found    


 





## License
	
**MIT** - Please refer to the LICENSE in the repository.
