var express = require('express');

var bodyparser = require('body-parser');

var mongoose = require('mongoose');

const app = express()

app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://locahost:27017/mydb' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
})

var db = mongoose.connection;

db.on('error' , () => console.log("Error in Connecting to Database"));
db.once('open' , () => console.log("Connected to Database"));

app.post("/signup" , (req,res) =>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    }
    db.collection('users').insertOne(data,(err,collection) =>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    });

    return res.redirect("signup_success.html")


})

app.get("/" , (req,res) =>{
    res.set({
        "Allow-access-Allow-origin": '*'
    })
    return res.redirect("index.html");
}).listen(7000);

console.log("Listening on PORT 3000");
