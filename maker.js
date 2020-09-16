/**
 * 
 */


// Init locate
let lat = 20.979062, lng = 105.843101;


// Initialize and add the map
function initMap() {
    // The location of Uluru
    var user = {lat, lng};
    // The map, centered at user
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: user});
    // The marker, positioned at user
    var marker = new google.maps.Marker({position: user, map: map});
  }
