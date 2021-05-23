const express = require('express');

const path = require('path')

const bodyparser = require('body-parser');

const session = require('express-session');

const { v4:uuidv4} = require('uuid');

const router = require('./router');

const app = express();

const port = process.env.PORT||3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine' , 'ejs');

//load static assets
app.use('/static' , express.static(path.join(__dirname,'views/public')))
app.use('/assets' , express.static(path.join(__dirname,'views/public/assets')))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUnitialialized: true
}));

app.use('/route' , router);

//home route

app.get('/' , (req,res) => {
    res.render('index' , {title:"Login System"})
})



app.listen(port, () => (console.log("Server Running")));