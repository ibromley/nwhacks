const express = require("express");
const app = express();

const addr = process.env.ADDR || "localhost:4000";
const [host, port] = addr.split(":");


app.get("/usertransactions/:name", (req, res) => {
    //return all not-completed tasks in the database
    var myJSON = getUserTransactions(req.params.name);
    res.json(myJSON);
    });

app.get("/test2", (req, res) => {
  var d_start = new Date(2014, 1, 1, 0, 0, 0, 0);
  var d_end = new Date(2017, 12, 12, 59, 59, 59, 999);
  graphTrans(transaction, "coffee", d_start, d_end, 49.2827, -123, 1000);
  var myJSON = JSON.stringify(mapsTrans);
  res.send(myJSON);

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
      long: getRandomInRange(-121, -125, 4),
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

for(i=0; i < transaction.length; i++ ){
  if (transaction[i].user == name) {

     allUserTransactions.push(transaction[i]);
    }
  }

 return allUserTransactions;

}

function graphTrans (data, item, startDate, endDate, lat, lon, radius){
  for(i=0; i < data.length; i++ ){
    if(data[i].item == item){
      if (data[i].date.getTime() > startDate.getTime() &&
          data[i].date.getTime() < endDate.getTime()) {
            if (isInsideBox(lat, lon, radius, data[i].lat, data[i].lon)) {
              mapsTrans.push(data[i]);
            }
          }
        }
      }
    }



function isInside(latCenter, lonCenter, radius, latTest, lonTest){
  let r = 6371000;
  let dlon = lonTest - lonCenter;
  let dlat = latTest - latCenter;
  let a = Math.pow((Math.sin(dlat/2)), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow( (Math.sin(dlon/2)), 2);
  let c = 2 * Math.pow(Math.atan( Math.sqrt(a), Math.sqrt(1-a) ), 2);
  let d = r * c; //(where R is the radius of the Earth)
  if (d <= radius){return 1;}
  else {return 0;}
}

//TODO currently only checking Lat. Long not working.
function isInsideBox(latCenter, lonCenter, radius, latTest, lonTest){
  return ( latCenter + radius > latTest &&
           latCenter - radius < latTest);// && // latTest between latCenter +- radius
        //   lonCenter + radius < lonTest &&
        //   lonCenter - radius > lonTest); // lonTest between lonCenter +- radius

/*
  var eRad = 6517219; // metres
  var latCenter_rad = Math.radians(latCenter);
  var latTest_rad = Math.radians(latTest);
  var dlat = Math.radians(latTest-latCenter);
  var dlon = Math.radians(lonTest-lonCenter);

  var a = Math.sin(dlat/2) * Math.sin(dlat/2) +
        Math.cos(latCenter) * Math.cos(latTest) *
        Math.sin(dlon/2) * Math.sin(dlon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = eRad * c;

  return (radius < d);
  */
}

 Math.radians = function (degrees) {
   return degrees* Math.PI/180;
 };
