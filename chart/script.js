//var defaultBorderColour = "#3e95cd";
let url = "http://localhost:4000/testfreq/?item=" + "salad";


var hours = []; //x-axis label
var i=0;
while(i<24) {
  hours.push(i);
  i++
}
console.log(hours);

var items = [];
var pathArray = [];
pathArray = url.split("/"); //array of each directory from url
console.log(pathArray);
var itemType = pathArray[pathArray.length -1].split("=")[1];
var newobject = fetch(url)
        .then(response => response.json())
        .then(data => {
            transactions = data;
            transactions.forEach(o => {

                let obj = {
                    count: o.count
                }
                console.log(obj);
                items.push(obj.count);
            });

        })
    .catch(err => alert(err.message));


console.log(itemType);
console.log(items);

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
