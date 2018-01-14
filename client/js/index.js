

var url = "http://localhost:4000/all"

var objects = [];


fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        objects = data;
    })
    .catch(function(err) {
        console.error(err);
        alert(err.message);
});