import { googleMap } from './googleMap';
import { getWeather } from './getWeather';

let api = "https://fcc-weather-api.glitch.me/api/current?";

$(document).ready(function() {
  var message = document.getElementById('message');

  // check if geolocation is allowed
  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
          message.innerHTML = "Geolocation is not supported by this browser.";
      }
  }

  // function to getLocation
  function showPosition(position) {
      var lat = position.coords.latitude,
          lon = position.coords.longitude,
          // lat lon for api url
          lat_api = "lat=" + lat,
          lon_api = "lon=" + lon;

      // call getWeather function
      getWeather(lat_api, lon_api);

      // call googleMap function
      googleMap(lat, lon);
  }

  // function to handle errors
  function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            message.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            message.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            message.innerHTML = "An unknown error occurred."
            break;
    }
  }
  // call getLocation function to ask for client geolocation
  getLocation();
});
