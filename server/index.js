const express = require("express");
const app = express();

const addr = process.env.ADDR || "localhost:4000";
const [host, port] = addr.split(":");


app.get("/test", (req, res) => {
    //return all not-completed tasks in the database
    transactions("bob");
    res.send(allUserTransactions);
});

app.listen(port, host, () => {
    console.log(`server is listening at http://${addr}....`);
});

let allUserTransactions = [];
let transaction  =[

{
  user: "bob",
 item: "coffee",
 price: 5.40,
 time: 730,
 latitude:  24.909,
 longitude:  24.909,

}

];


function transactions (name){
var count = 0;

for(i=0; i < transaction.length; i++ ){
  if (transaction[i].user == name) {
    if (count == allUserTransactions.length) {
      allUserTransactions.length *= 2;
    }
     allUserTransactions[count++] = transaction[i];
    }
  }

 //allUserTransactions;

};
