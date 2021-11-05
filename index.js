const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const path = require ('path')
const ejs = require('ejs')

const app = express()
const PORT = process.env.PORT|| 8080
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb+srv://CHILLBRO:abi1310%40@cluster0.0wbup.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

//Add data to DB
app.post("/dates",(req,res)=>{
    var name = req.body.name;
    var bday = req.body.bday;
    

    var data = {
        "name": name,
        "bday": bday,
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Successfully added dates to MongoDB");
    });

    return res.redirect('signup_success.html')

})

//add wish to db

app.post("/wish",(req,res)=>{
    var namei = req.body.namei;
    var namew = req.body.namew;
    

    var data = {
        "wisher": namei,
        "wished": namew,
    }

    db.collection('wish').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Successfully added wish to MongoDB");
    });

    return res.redirect('./bday/wish.html')

})


app.engine('html', require('ejs').renderFile);

app.get('/', (req,res) => {
    res.sendFile('index.html', { root: __dirname })
})

app.get('/dates', (req, res) => {
    res.render(path.resolve('./public/dates.html'));
   })

   app.get('/bday/wish', (req, res) => {
    res.render(path.resolve('./public/bday/wish.html'));
    //console.log(req.query)
})   

   app.get('/bday/iwish', (req, res) => {
    res.render(path.resolve('./public/bday/iwish.html'));
   })


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('dates.html');
})

app.listen(PORT ,(req, res) =>{
    console.log("Listening on PORT 8080 Success")
})


//abi1310@ 