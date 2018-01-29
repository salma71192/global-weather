var api = "https://fcc-weather-api.glitch.me/api/current?";

$(document).ready(function() {
  var x = document.getElementById('x');

  // check if geolocation is allowed
  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
  }
  // getWeather function
  function getWeather(lt, ln) {
    var urlString = api + lt + "&" + ln;
    $.ajax({
      url: urlString,
      success: function (result) {
          console.log(result.name);
          console.log(result.clouds);
          console.log(result.weather[0].icon);
          console.log(result.main.temp);
          console.log(result.main.humidity);
      }
    });
    console.log(urlString);
  }

  // function to getLocation
  function showPosition(position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;

      getWeather(lat, lon);

      var latlon = position.coords.latitude + "," + position.coords.longitude;
      var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
      + latlon +"&zoom=14&size=400x300&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
      document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";


  }

  // function to handle errors
  function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }

}

  var btn = $('#btn');
  btn.on('click', () => {
    getLocation();
  })
});
