// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

//Init center position
const initCenter = {
    lat: 20.973872,
    lng: 105.845828
};

const infoUser = {
    name: "Tulpo"
}

const icons = [{
    "icon": "https://robohash.org/itaqueomnisest.jpg?size=50x50&set=set1"
}, {
    "icon": "https://robohash.org/repellatutcorporis.bmp?size=50x50&set=set1"
}, {
    "icon": "https://robohash.org/modilaboremagnam.png?size=50x50&set=set1"
}, {
    "icon": "https://robohash.org/aperiamconsequaturaut.jpg?size=50x50&set=set1"
}, {
    "icon": "https://robohash.org/quiaetex.jpg?size=50x50&set=set1"
}, {
    "icon": "https://robohash.org/nonculpaodit.bmp?size=50x50&set=set1"
}, {
    "icon": "https://robohash.org/ducimusessenumquam.bmp?size=50x50&set=set1"
}, {
    "icon": "https://robohash.org/nihildoloreseos.jpg?size=50x50&set=set1"
}, {
    "icon": "https://robohash.org/quoducimuspariatur.bmp?size=50x50&set=set1"
}, {
    "icon": "https://robohash.org/quisexnam.jpg?size=50x50&set=set1"
}]

const initArea = [
    { lat: 20.976076, lng: 105.840957 },
    { lat: 20.976397, lng: 105.846171 },
    { lat: 20.972770, lng: 105.847072 },
    { lat: 20.971148, lng: 105.839798 },
    { lat: 20.973372, lng: 105.840978 },
    { lat: 20.976918, lng: 105.850849 },
    { lat: 20.978280, lng: 105.850291 },
    { lat: 20.979182, lng: 105.840399 },
    { lat: 20.979963, lng: 105.844690 },
    { lat: 20.979282, lng: 105.843060 }
]

var map;
// Init map
async function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: initCenter,
        zoom: 18
    });

    // Traffic density
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    // render user other
    renderMap(map, icons, initArea);

    //render current user
    let pos = await getGeolocation();
    renderCurrentUser(map, pos);
}

// Get geolocation
// return object pos: {lat, lng}
function getGeolocation() {
    return new Promise((res, rej) => {
        //Try HTML5 geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                res({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            })
        } else {
            rej("Your browser doesn\'t support geolocation");
        }
    });
}

// Render map
function renderMap(map, icons, initArea) {

    let features = ((initArea) => {
        let arr = [];
        for (let i = 0; i < initArea.length; i++) {
            arr.push({
                position: new google.maps.LatLng(initArea[i]),
                type: 'info'
            })
        }
        return arr;
    })(initArea);

    // Create markers.
    for (var i = 0; i < features.length; i++) {
        let marker = new google.maps.Marker({
            position: features[i].position,
            icon: icons[i].icon,
            map: map
        });
    };
}


//Rerender map and create new marker with infoUser;
function renderCurrentUser(map, pos) {
    map.setCenter(pos);
    let marker = new google.maps.Marker({
        position: pos,
        map: map
    });
    let infoWindow = new google.maps.InfoWindow({
        content: `<h1>Hello, ${infoUser.name}</h1>`
    });
    infoWindow.setPosition(pos);
    infoWindow.open(map);
    // marker listenning
    marker.addListener('click', function () {
        infoWindow.open(map);
    });
}
