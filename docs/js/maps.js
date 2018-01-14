function loadMap() {
    // Initialize Google Maps
    const mapOptions = {
        center:new google.maps.LatLng(48.7949, -122.6976),
        zoom: 8
    }
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);


    url = "https://nwhacks-transactions.herokuapp.com/test2";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            transactions = data;
            transactions.forEach(o => {
                let marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(o.lat, o.lon),
                    title: o.user
                    })
            });

        
        })
    .catch(err => alert(err.message));

    var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: {lat: 49.25, lng: -123.1},
        radius: Math.sqrt(1000000) * 100
      });

    // Initialize Googl Markers
}
