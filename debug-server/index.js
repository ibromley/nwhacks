const express = require("express");
const morgan = require("morgan");
const app = express();
const sqlite3 = require('sqlite3').verbose();

const addr = process.env.ADDR || ":4000";
const [host, port] = addr.split(":");
const portNum = parseInt(port);

app.use(express.json());
app.use(morgan(process.env.LOG_FORMAT || "dev"));





const db = new sqlite3.Database('data.db');
 
db.serialize(function() {
    /*db.run("CREATE TABLE lorem (info TEXT)");
    
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();*/
    let objects = [];
    db.each("SELECT * FROM users u, transactions t WHERE u.userid = t.userid", function(err, row) {
        let entity = {
            firstName: row.fname,      
            lastName: row.lname,
            transaction: {
                item: row.item,
                price: row.price,
                location: row.location
            }             
        };
        objects.push(entity);
    });

    app.get("/all", (req, res) => {
        //let user = JSON.parse(userJSON);
        res.json(objects);
    });

});
 
db.close();


app.listen(portNum, host, ()=> {
    console.log(`server is listening at http://${addr}...`);
});
