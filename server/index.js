const express = require("express");
const app = express();

const addr = process.env.ADDR || "localhost:4000";
const [host, port] = addr.split(":");


app.get("/test", (req, res) => {
    //return all not-completed tasks in the database
    var myJSON = JSON.stringify(getUserTransactions("Bob"));
    res.send(myJSON);
});

app.listen(port, host, () => {
    console.log(`server is listening at http://${addr}....`);
});

let allUserTransactions = [];
let userNames = ["Alice", "Bob", "Chris", "Doris"];
let items = ["coffee", "bagel", "sandwich", "milkshake", "water", "salad"]
let transaction  = generateTransactions(500);

function generateTransactions(num) {
  let trans = [num];
  for (i = 0; i < num; i++) {
    trans[i] = {
      user: userNames[getRandomInRange(0, 3, 0)],
      item: items[getRandomInRange(0,5,0)],
      price: getRandomInRange(0.5, 30, 2),
      date: generateNewDate(),
      lat: getRandomInRange(-180, 180, 3),
      long: getRandomInRange(-90, 90, 3),
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
                  getRandomInRange(0,60,0), //minute
                  getRandomInRange(0,60,0), //second
                  getRandomInRange(0,100,0)); //millisecond
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

};
