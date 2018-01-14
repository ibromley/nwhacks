
let transaction  =[

{
  user: "bob"
 item: "coffee"
 price: 5.40
 time: 730
 latitude:  24.909
 longitude:  24.909

}

]


function transactions (name){
var count = 0;
let allUserTransactions[];

for(i=0; i < transaction.length; i++ ){
  if (transaction[i].user == name) { allUserTransactions[count++] = transaction[i];  }
  }

 allUserTransactions;

}
