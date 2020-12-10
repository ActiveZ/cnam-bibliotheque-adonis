// https://www.npmjs.com/

const Express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require("express-session")


const app = Express()

// appliquer ejs comme moteur de template
app.set('view engine', 'ejs')

// middleware
app.use(Express.static('public'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cookieParser())

app.use(session({
    secret:"abc",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false} // no https
}))

app.use((req,res,next)=>{
    console.log("requete reçue")
    next()
})

app.use((req,res,next)=>{
    console.log("date:", Date.now())
    next()
})


module.exports = app