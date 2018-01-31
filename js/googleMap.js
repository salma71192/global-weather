// Google map function
function googleMap(lt, ln) {
  var latlon = new google.maps.LatLng(lt, ln);
  var mapholder = document.getElementById('mapholder');
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
    title: result.name
  });
}

export { googleMap };
