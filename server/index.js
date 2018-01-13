const express = require("express");
const app = express();

const addr = process.env.ADDR || "localhost:4000";
const [host, port] = addr.split(":");


app.get("/test", (req, res) => {
    //return all not-completed tasks in the database
    res.send('hello world');
});



app.listen(port, host, () => {
    console.log(`server is listening at http://${addr}....`);
});
