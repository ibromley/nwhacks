getJSONMarkers();


var hours = []; //x-axis label
var i=0;
while(i<24) {
  hours.push(i);
  i++
}
console.log(hours);

var coffee = [];

function getJSONMarkers() {

    var objects = [];

    url = "http://localhost:4000/testfreq";
    var newobject = fetch(url)
        .then(response => response.json())
        .then(data => {
            transactions = data;
            transactions.forEach(o => {

                let pins = {
                    count: o.count
                }
                console.log(pins);
                objects.push(pins);
                coffee.push(pins.count);
            });
            return objects;

        })
    .catch(err => alert(err.message));
}
/*
function demo(data) {
  let arr = [{item, count}];
  for (i=0, i<data.length);i++){
    if (arr.includes({data[i].item}, /[0-9]+/)) {
        for (j=0, j<arr.length); i++) {
          if (arr[j].item == data[i].item) {
            arr[j].count++;
          }
        } else {
          arr.push({item: data[i],
                    count: 1});
        }
    }
  }
}

*/
