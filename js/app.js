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

  // function tochoose the right weather icon
  function iconName(name) {
    switch (name) {
      case 'Drizzle':
        return "wi-rain-mix";
        break;
      case 'Clouds':
        return "wi-cloudy";
        break;
      case 'Rain':
        return "wi-rain";
        break;
      case 'Snow':
        return "wi-snow";
        break;
      case 'Clear':
        return "wi-day-sunny";
        break;
      case 'Thunderstom':
        return "wi-thunderstorm";
        break;
      default:
        return "";
      }
  }

  // getWeather function to upload weather information
  function getWeather(lt, ln) {
    let urlString = api + lt + "&" + ln,
        icon;

    // handle tempunit
    $("#tempunit").click(function () {
      var currentTempUnit = $("#tempunit").text();
      var newTempUnit = currentTempUnit == "C" ? "F" : "C";
      $("#tempunit").text(newTempUnit);
      if (newTempUnit == "F") {
        var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
        $("#temp").text(fahTemp + " " + String.fromCharCode(176));
      } else {
        $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      }
    });

    $.ajax({
      url: urlString,
      success: function (result) {
        $("#city").text(result.name + ", ");
        $("#country").text(result.sys.country);
        currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
        $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
        $("#tempunit").text("C");
        $("#wc").text(result.weather[0].main);
        icon = '<i class="wi ' + iconName(result.weather[0].main) + '"></i>';
        $("#icon").html(icon);
      }
    });
  }

  // Google map function
  function googleMap(lt, ln) {
    const latlon = new google.maps.LatLng(lt, ln),
          mapholder = document.getElementById('mapholder'),
          cityName = document.getElementById('city').textContent;

    mapholder.classList.add('mapholder');

    var myOptions = {
      center:latlon,
      zoom:14,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      mapTypeControl:false,
      navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }

    var map = new google.maps.Map(mapholder, myOptions);
    var marker = new google.maps.Marker({
      position:latlon,
      map:map,
      title: "City Name"
    });
  }


  // function to getLocation
  function showPosition(position) {
      $('#message').text('');
      let lat = position.coords.latitude,
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
