// fake JSON call
function getJSONMarkers() {
   var objects = [];
    url = "http://localhost:4000/test2";
    var newobject = fetch(url)
        .then(response => response.json())
        .then(data => {
            transactions = data;
            transactions.forEach(o => {
                
                let pins = {
                    name: o.user,
                    location: [o.lat, o.lon]
                }
                console.log(pins);
                objects.push(pins);
            });
            return objects;
        
        })
    .catch(err => alert(err.message));
    
    /*const markers = [
        {
        name:  "Rixos The Palm",
        location: [25.1212, 55.1535]
        },
        {
        name: "Shangri-La Hotel",
        location: [25.2084, 55.2719]
        },
        {
        name: "Grand Hyatt",
        location: [25.2285, 55.3273]
        }
    ];
    console.log(objects);
    return objects;*/
}

function loadMap() {
    // Initialize Google Maps
    const mapOptions = {
        center:new google.maps.LatLng(25.2048, 55.2708),
        zoom: 11
    }
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Load JSON Data
    const hotelMarkers = getJSONMarkers();

    // Initialize Google Markers
    for(hotel of hotelMarkers) {
        let marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(hotel.location[0], hotel.location[1]),
        title: hotel.name
        })
    }
}