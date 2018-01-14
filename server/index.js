const express = require("express");
const app = express();

var port = process.env.PORT || 4000;

let allUserTransactions = [];
let userNames = ["Alice", "Bob", "Chris", "Doris"];
let items = ["coffee", "bagel", "sandwich", "milkshake", "water", "salad"];
let transaction = generateTransactions(500);
let mapsTrans = []; // list of all valid transactions for graph or map

app.get("/trans", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json(transaction);
});

app.get("/test", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //return all not-completed tasks in the database
    let myJSON = getUserTransactions(req.query.name);
    res.json(myJSON);
});

app.get("/test2", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var d_start = new Date(2014, 1, 1, 0, 0, 0, 0);
  var d_end = new Date(2017, 12, 12, 59, 59, 59, 999);
  //reccomendation("Bob");
  graphTrans(transaction, "coffee", d_start, d_end, 49.2827, -123, 100000);
  var myJSON = mapsTrans;
  res.json(myJSON);

});


app.get("/test3/:lat&:item", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var d_start = new Date(2014, 1, 1, 0, 0, 0, 0);
  var d_end = new Date(2017, 12, 12, 59, 59, 59, 999);
  graphTrans(transaction, req.params.item, d_start, d_end, req.params.lat, -123, 100000);
  var myJSON = mapsTrans;
  res.json(myJSON);

});

app.get("/testfreq/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var frequency =   graphDataSimple(req.query.item); 
  res.json(frequency);
});

app.get("/testreg", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var frequency =   reccomendation("Bob");
  res.json(frequency);
});

app.listen(port, () => {
    console.log(`server is listening at http://localhost:${port}....`);
});

function generateTransactions(num) {
  let trans = [num];
  for (let i = 0; i < num; i++) {
    trans[i] = {
      user: userNames[Math.floor(Math.random() * userNames.length)],
      item: items[Math.floor(Math.random() * items.length)],
      price: getRandomInRange(0.5, 30, 2),
      date: generateNewDate(),
      lat: getRandomInRange(48, 52, 4),
      lon: getRandomInRange(-122, -124, 4),
    }

  }
  return trans;
}

function generateNewDate() {
  var year = getRandomInRange(2010, 2018, 0);
  var month = getRandomInRange(1, 12, 0);
  if (month == 4 || month == 6 || month == 9 || month == 11) {
    var days = getRandomInRange(1, 30, 0);
  } else if (month == 2) {
    if (year % 4 == 0) {
      var days = getRandomInRange(1,29,0);
    } else {
      var days = getRandomInRange(1, 28, 0);
    }
  } else {
    var days = getRandomInRange(1,31,0);
  }
  var d = new Date(year,
                  month,
                  days,
                  getRandomInRange(0,23,0), //hour
                  getRandomInRange(0,59,0), //minute
                  getRandomInRange(0,59,0), //second
                  getRandomInRange(0,999,0)); //millisecond
  return d;
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function getUserTransactions (name) {
  var count = 0;
  //console.log(transaction);
  if (allUserTransactions !== []) {
    allUserTransactions = [];
  }
  for(let i = 0; i < transaction.length; i++) {
    if (transaction[i].user == name) {
       allUserTransactions.push(transaction[i]);
    }
  }
  return allUserTransactions;
}

function graphTrans (data, item, startDate, endDate, lat, lon, radius){
  if ( mapsTrans != []) {
    mapsTrans = [];
  }
  for(i=0; i < data.length; i++ ){
    if(data[i].item == item){
      if (data[i].date.getTime() > startDate.getTime() &&
          data[i].date.getTime() < endDate.getTime()) {
            if (getDistanceFromLatLonInM(lat, lon, data[i].lat, data[i].lon) < radius) {
              mapsTrans.push(data[i]);
            }
          }
        }
      }
    }

 function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
   var erad = 6371000; // Radius of the earth in m
   var dLat = deg2rad(lat2-lat1);  // deg2rad below
   var dLon = deg2rad(lon2-lon1);

   var a =
     Math.sin(dLat/2) * Math.sin(dLat/2) +
     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
     Math.sin(dLon/2) * Math.sin(dLon/2)
     ;
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
   var d = erad * c; // Distance in km

   return d;

 }

 function deg2rad(deg) {
   return deg * (Math.PI/180)
 }



 function reccomendation(user) {
//assuming one user data exissts
let arr = [{
  item: transaction[0].item,
  count: 1,
}];
var suggested = [];
let j = 0;
var regEx = /[0-9]+/i;
for (let i=1; i < transaction.length; i++ ){
  /*if (arr.includes({item: transaction[i].item,
                    count: regEx,})) {*/
      let indexed = 0;
      for (j=0; j<arr.length; j++) {
        if (arr[j].item != transaction[i].item) {}
        else {  arr[j].count++; indexed = 1; }
    //}
    }
      if(indexed == 0) {arr.push({item: transaction[i].item, count: 1});}
}

arr.sort(function (x, y){    return y.count - x.count;}); // sort arr by highest count (suppoosedly)
console.log(arr);

for (k=0; k<transaction.length; k++){
    if( transaction[k].item == arr[0].item || transaction[k].item == arr[2].item ||transaction[k].item == arr[1].item){
      suggested.push(transaction[k]);
    }
  }

  return suggested;
}


function graphDataSimple(item){
  let freq = new Array(24);
  for (let i = 0; i < freq.length; i++) {
     freq[i] = {
      count: 0,
    }
  }

  for(i = 0; i < transaction.length; i++) {
    if( transaction[i].item  == item){ //if items match,
      freq[transaction[i].date.getHours()].count++; //increment count on the hour
  }
  }
return freq;
}
