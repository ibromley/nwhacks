//var defaultBorderColour = "#3e95cd";



var hours = []; //x-axis label
var i=0;
while(i<24) {
  hours.push(i);
  i++
}
console.log(hours);

var items = [];
var pathArray = [];
console.log(pathArray);
getJSONMarkers();
var itemType = pathArray[pathArray.length -1].split("=")[1];

console.log(itemType);
console.log(items);

function getJSONMarkers() {


    url = "http://localhost:4000/testfreq/?item=" + "coffee";
    pathArray = url.split("/"); //array of each directory from url
    var newobject = fetch(url)
        .then(response => response.json())
        .then(data => {
            transactions = data;
            transactions.forEach(o => {

                let pins = {
                    count: o.count
                }
                console.log(pins);
                items.push(pins.count);
            });

        })
    .catch(err => alert(err.message));
}

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: hours,
        datasets: [{
            label: itemType,
            data: items,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
