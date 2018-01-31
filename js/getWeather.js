// getWeather function to upload weather information
function getWeather(lt, ln) {
  var urlString = api + lt + "&" + ln;
  $.ajax({
    url: urlString,
    success: function (result) {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#tempunit").text("C");
      $("#wc").text(result.weather[0].main);
    }
  });
}

export { getWeather };
