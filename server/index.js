const express = require("express");
const app = express();

const addr = process.env.ADDR || "localhost:4000";
const [host, port] = addr.split(":");


app.get("/test", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //return all not-completed tasks in the database
    let myJSON = getUserTransactions(req.params.name);
    res.json(myJSON);
    });

app.get("/test2", (req, res) => {
  var d_start = new Date(2014, 1, 1, 0, 0, 0, 0);
  var d_end = new Date(2017, 12, 12, 59, 59, 59, 999);
  reccomendation("Bob");
  graphTrans(transaction, "coffee", d_start, d_end, 49.2827, -123, 100000);
  var myJSON = mapsTrans;
  res.json(myJSON);

});


app.get("/test3/:lat&:item", (req, res) => {
  var d_start = new Date(2014, 1, 1, 0, 0, 0, 0);
  var d_end = new Date(2017, 12, 12, 59, 59, 59, 999);
  graphTrans(transaction, req.params.item, d_start, d_end, req.params.lat, -123, 100000);
  var myJSON = mapsTrans;
  res.json(myJSON);

});

app.listen(port, host, () => {
    console.log(`server is listening at http://${addr}....`);
});

let allUserTransactions = [];
let userNames = ["Alice", "Bob", "Chris", "Doris"];
let items = ["coffee", "bagel", "sandwich", "milkshake", "water", "salad"]
let transaction  = generateTransactions(500);
let mapsTrans = []; // list of all valid transactions for graph or map

function generateTransactions(num) {
  let trans = [num];
  for (i = 0; i < num; i++) {
    trans[i] = {
      user: userNames[getRandomInRange(0, userNames.length, 0)],
      item: items[getRandomInRange(0,items.length,0)],
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

function getUserTransactions (name){
  var count = 0;
  if (allUserTransactions != []) {
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


/*
 function reccomendation(user) {
//assuming one user data exissts
    let userData = getUserTransactions(user);
    let userCommonItems = [


    ];
    let itemIndexed = 0;
    for(let i = 0; i < userData.length; i++){
      if()


    }


    {
      item: ,//userData[0].item,
      count: ,//1,
    }];
    let itemIndexed = 0;
    let n = 0;

    for(let i=0; i< userData.length; i++){
      itemIndexed = 0;
        for(n=1; n<userData.length-1; n++ ){
          if(userCommonItems[n].item == userData[i].item){
            itemIndexed = 1;
            break;
            }
          }
        if( itemIndexed == 0 ){
          userCommonItems.push({item: userData[i].item, count: (userCommonItems+1)});
          }
        else if(itemIndexed == 1){
        userCommonItems[n].count++;
    }
}

//sorting 2d array by item commonality
userCommonItems.sort(function (a, b){

  if (a[1] === b[1]) {        return 0;    }
  else {      return (a[1] > b[1]) ? -1 : 1;    }


});
console.log(userCommonItems[0], userCommonItems[1], userCommonItems[2]);
}

*/

function graphDataSimple(item){
  let data = getUserTransactions();
  let freq = [];
  freq.length = 24;
  for(i = 0; i <freq.length; i++ ){ freq[i] = 0;}

  for(i = 0; i < data.length; i++){
    if( data[i].item  == item){ freq[getHour(data.date)]++;}
  }
  return freq;
}
