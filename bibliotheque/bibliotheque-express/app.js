// importations
const express = require('express');
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser')
const session = require("express-session")
// const dateFormat = require("dateformat")

// instance
const app = express();
// appliquer moteur de template ejs
app.set('view engine','ejs')
// middlewares
app.use(express.static('public'))

app.use(bodyParser.urlencoded(
  { extended:false }
))

app.use(bodyParser.json())

app.use(cookieParser())

app.use(session( {
    secret: "'(-è_çàhgcjh5465s4fd",
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false} // no https
}))


// exportations
module.exports = app