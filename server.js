if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const port = process.env.PORT
const path = require("path");

const express = require('express')

const sessionKEY = process.env.SESSION_KEY



const app = express();
//const server = http.createServer(app)
//const io = socketio(server)

const compression = require('compression');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const sessions = require('express-session');
const fs = require("fs");

const contactForm = require("./form_data/contact_form.json");
const porftfolio = require("./portfolio.json")
const contactFormUpdate = (add_, time)=>{
    add_.sentDate = time;
    let curr_arr = contactForm;
    curr_arr.push(add_);
    let write_data = JSON.stringify(curr_arr);
    let return_dt = {
        completed:true,
    }
    let create =fs.writeFile('./form_data/contact_form.json', write_data, (err)=>{
        if(err){
            return_dt =  {
                completed:false,
            }            
        }else{
            
        }
    })
    return return_dt
}



/*UI */



app.use(compression({
    level:6,
    threshold:0,
    filter:(req,res)=>{
        if(req.headers['x-no-compression']){
            return false
        }
        return compression.filter(req,res)
    }    
}));

app.set('view engine', 'ejs');
app.use(express.static( path.join(__dirname,'public')));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.urlencoded({extended:false}));
app.use(sessions({
    secret: sessionKEY,
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    resave: false,
}));


app.get("/", async(req,res)=>{
    res.render("home.ejs", {
        data:porftfolio,
    })
})

app.get("/articles", async(req,res)=>{
    res.render("articles.ejs", {
        data:porftfolio,
    })
})

app.post("/contact/collect", async(req,res)=>{
    let body_ = req.body;
    let sentDate = new Date().getTime();
    let update_ = contactFormUpdate(body_, sentDate);
    res.send({
        completed:update_.completed
    })
})
 app.get("/admin", (req,res)=>{

 })


app.listen(port, ()=>{
    console.log(`port open on ${port}`)
});












