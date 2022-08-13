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


app.listen(port, ()=>{
    console.log(`port open on ${port}`)
});












